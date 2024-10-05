from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from enum import Enum, auto

import openai

# OpenAI API Key


app = Flask(__name__)
CORS(app)

#states of conversation
class State(Enum):
    init = auto()
    where = auto()
    why_this_problem_is_important = auto()
    brief_confirmation = auto()
    end = auto()

# Function to get the next enum
def next_enum(enum_value):
    members = list(State)
    index = members.index(enum_value)
    return members[index + 1] 

#how many times chatGPT will do back and force
MAX_ITERATIONS = 2

class ConversationState:
    def __init__(self):
        self.state = State.init
        self.cur_state_of_iterations = 0

conversation_history = [{"role": "system", "content": "You are ChatGPT."}]

initial_prompt = """
The following situation is explained to me:
[In London, a person named Ben is unhappy with how promotions work at IntelligentConsulting. Ben complains that despite exceeding KPIs, the promotion was not granted. The root cause is a lack of visibility.]

Here is my brief:
"{}"

If this brief clearly or implicitly answers the question "{}", respond with a simple "yes."

If the answer is unclear, incomplete, or differs from the original situation, ask **a straightforward clarification question** addressing me directly, without repeating the original question or providing additional explanations.

Your response should be either a direct clarification question or "yes." Keep it concise, avoiding extra text or context.
"""


follow_up_prompt = """
I gave this response: "{}" to your previous question.

Based on this explanation, if my answer contains the reply to the question "{}", reply with "yes."

If the answer is ambiguous, incomplete, or unclear, ask **a simple and direct clarification question** based on the student’s answer, without repeating the original question.

If the answer is ambiguous, incomplete, or not the same as in the original situation ask **a simple and direct clarification question** 

Your response should be either a direct clarification question or "yes." Avoid additional text or meta-explanations.
"""


brief_prompt = """
Based on the answers I provided and the initial situation description, please create a brief summary. 
After the summary, ask me if I agree with the brief or would like to add anything. 
"""

brief_follow_up_prompt = """
Based on my reply [{}], if I confirm that I agree with the summary or say something like 'all good' or 'no changes,' respond with a simple 'yes'  otherwise add my reply to the summary and ask me again if I am happy with it
"""

#'Does this revised summary accurately reflect your understanding?' or 'Is this updated summary satisfactory?'

# Route to render the HTML template
@app.route('/')
def index():
    return render_template('simple.html')

class Conversation:

    def __init__(self):
        self.state = ConversationState()
        self.conversation_history = [{"role": "system", "content": "You are ChatGPT."}]
        self.situation_description = ""

    def send_to_gpt(self):
        try:
            response = openai.ChatCompletion.create(
            model="gpt-4",  # or "gpt-4" if available
            messages = self.conversation_history,
            max_tokens=100,
            temperature=0.7
            )
            reply = response['choices'][0]['message']['content']
            self.conversation_history.append({"role": "assistant", "content": reply})            # Get the response content
            print("current conversation is ", self.conversation_history)
            print("returning reply: ", reply)
            return reply
        except Exception as e:
            reply = f"An error occurred: {e}"
            return reply

    def reply(self, user_prompt):
        match self.state.state:
            case State.init:
                if len(self.situation_description) == 0:
                    self.situation_description = user_prompt
                reply, question_is_answered = self.clarify(user_prompt, "Did they understand who is involved in the situation ?")
                return self.return_reply_or_go_to_next_state(reply, question_is_answered)
            case State.where:
                reply, question_is_answered = self.clarify(user_prompt, "Did they understand where is happened ?")
                return self.return_reply_or_go_to_next_state(reply, question_is_answered)
            case State.why_this_problem_is_important:
                reply, question_is_answered = self.clarify(user_prompt, "Why this is an important problem ?")
                return self.return_reply_or_go_to_next_state(reply, question_is_answered)
            case State.brief_confirmation:
                reply, question_is_answered = self.construct_brief(user_prompt)
                return self.return_reply_or_go_to_next_state(reply, question_is_answered)
            case State.end:
                return jsonify({"response": "the end"})


    def reply_is_yes(self, reply):
        pos = reply.lower().find("yes")
        if pos != -1 and len(reply) < 10:
            return True
        else:
            return False
    
    def clarify(self, user_prompt, question_to_clarify):
        if self.state.cur_state_of_iterations == 0:
            self.conversation_history.append({"role":"user", "content":initial_prompt.format(user_prompt, question_to_clarify)})
        else:
            self.conversation_history.append({"role":"user", "content":follow_up_prompt.format(user_prompt, question_to_clarify)})
        reply = self.send_to_gpt()

        if self.reply_is_yes(reply) or self.state.cur_state_of_iterations > MAX_ITERATIONS:
            self.state.cur_state_of_iterations = 0
            return "", True
        else:
            self.state.cur_state_of_iterations += 1
            return jsonify({"response": reply}), False    
    
    def construct_brief(self, user_prompt):
        if self.state.cur_state_of_iterations == 0:
            self.conversation_history.append({"role":"user", "content": brief_prompt})
            self.state.cur_state_of_iterations += 1
            reply = self.send_to_gpt()
            return jsonify({"response": reply}), False
        else:       
            print("USER prompt", user_prompt)
            self.conversation_history.append({"role":"user", "content": brief_follow_up_prompt.format(user_prompt)})
            self.state.cur_state_of_iterations += 1
            reply = self.send_to_gpt()
            print("GPT reply", reply)
            if self.reply_is_yes(reply) or self.state.cur_state_of_iterations > MAX_ITERATIONS:
                self.state.cur_state_of_iterations = 0
                return "", True
            else:
                self.state.cur_state_of_iterations += 1
                return jsonify({"response": reply}), False  

    def return_reply_or_go_to_next_state(self, reply, question_is_answered):
        print(reply)
        print("question_is_answered", question_is_answered)
        if not question_is_answered:
            return reply
        else:
            #if there are no more questions to ask we call reply recurcively and thus go to the next state
            self.state.state = next_enum(self.state.state)
            return self.reply("")

conversation = Conversation()

@app.route('/api/send_prompt', methods=['POST'])
def send_prompt():
    data = request.get_json()
    user_prompt = data.get('prompt') 
    
    return conversation.reply(user_prompt)

if __name__ == '__main__':
    app.run(debug=True)