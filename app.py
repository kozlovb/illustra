from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from enum import Enum, auto
import re

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
original_situation  = 
"In London, a person named Ben is unhappy with how promotions work at IntelligentConsulting. Ben complains that despite exceeding KPIs, the promotion was not granted. The root cause is a lack of visibility."

Here is a brief:
"{}"

If this brief clearly or implicitly answers the question "{}", respond with a simple "yes."

If the answer is unclear, incomplete, or differs from the original_situation, ask **a straightforward clarification question** addressing me directly, without repeating the original question or providing additional explanations.

Your response should be either a direct clarification question or "yes." Keep it concise, avoiding extra text or context.
"""


follow_up_prompt = """
I gave this response: "{}" to your previous question.

Based on this explanation, if my answer contains the reply to the question "{}", reply with "yes."

If the answer is ambiguous, incomplete, or unclear, ask **a simple and direct clarification question** based on my answer, without repeating the original question.

If the answer is ambiguous, incomplete, or not the same as in the original_situation ask **a simple and direct clarification question** 

Your response should be either a direct clarification question or "yes." Avoid additional text or meta-explanations.
"""


brief_prompt = """
Based on the answers I provided and the initial situation description, please create a brief summary. 
After the summary, ask me if I agree with the brief or would like to add anything. 
Please put the question in [].
"""

brief_follow_up_prompt = """
Based on my reply [{}], if I confirm that I agree with the summary or say something like 'all good' or 'no changes,' respond with a simple 'yes'  otherwise add my reply to the summary and ask me again if I am happy with it.
Please put the question in [].
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
        self.final_brief = ""

    def send_to_gpt(self, prompt_dict):
        self.conversation_history.append(prompt_dict)
        try:
            response = openai.ChatCompletion.create(
            model="gpt-4",
            messages = self.conversation_history,
            max_tokens=100,
            temperature=0.7
            )
            reply = response['choices'][0]['message']['content']
            print("MODELMODEL",response['model']) 
            self.conversation_history.append({"role": "assistant", "content": reply})
            print("current conversation is ", self.conversation_history)
            return reply
        except Exception as e:
            reply = f"An error occurred: {e}"
            return reply

    def reply(self, user_prompt):
        match self.state.state:
            case State.init:
                if len(self.situation_description) == 0:
                    self.situation_description = user_prompt
                reply, question_is_answered = self.clarify(user_prompt, "Who is involved in the situation ?")
                return self.return_reply_or_go_to_next_state(reply, question_is_answered, self.situation_description)
            case State.where:
                reply, question_is_answered = self.clarify(user_prompt, "Where did situation happen ?")
                return self.return_reply_or_go_to_next_state(reply, question_is_answered, self.situation_description)
            case State.why_this_problem_is_important:
                reply, question_is_answered = self.clarify(user_prompt, "Why this is an important problem ?")
                return self.return_reply_or_go_to_next_state(reply, question_is_answered, "")
            case State.brief_confirmation:
                reply, question_is_answered = self.construct_brief(user_prompt)
                return self.return_reply_or_go_to_next_state(reply, question_is_answered, "")
            case State.end:
                return jsonify({"response": "You can now press on discover my brief button"})


    def reply_is_yes(self, reply):
        pos = reply.lower().find("yes")
        if pos != -1 and len(reply) < 10:
            return True
        else:
            return False
    
    def clarify(self, user_prompt, question_to_clarify):
        reply = ""
        if self.state.cur_state_of_iterations == 0:
            reply = self.send_to_gpt({"role":"user", "content":initial_prompt.format(user_prompt, question_to_clarify)})
        else:
            reply = self.send_to_gpt({"role":"user", "content":follow_up_prompt.format(user_prompt, question_to_clarify)})

        if self.reply_is_yes(reply) or self.state.cur_state_of_iterations > MAX_ITERATIONS:
            self.state.cur_state_of_iterations = 0
            return "", True
        else:
            self.state.cur_state_of_iterations += 1
            return jsonify({"response": reply}), False    

    def parse_brief_reply(self, reply_with_question):
    
        brief_with_question = re.sub(r'\[(.*?)\]', r'\1', reply_with_question)
        print("HERE is the brief with Q", brief_with_question)
    
        brief = re.sub(r'\s*\[.*?\]\s*', ' ', reply_with_question).strip()
        print("HERE is the brief", brief)
    
        return brief, brief_with_question

    def construct_brief(self, user_prompt):
        if self.state.cur_state_of_iterations == 0:
            self.state.cur_state_of_iterations += 1
            reply = self.send_to_gpt({"role":"user", "content": brief_prompt})
            self.final_brief, reply = self.parse_brief_reply(reply)
            return jsonify({"response": reply}), False
        else:       
            self.state.cur_state_of_iterations += 1
            reply = self.send_to_gpt({"role":"user", "content": brief_follow_up_prompt.format(user_prompt)})
            if self.reply_is_yes(reply) or self.state.cur_state_of_iterations > MAX_ITERATIONS:
                self.state.cur_state_of_iterations = 0
                return "", True
            else:
                self.final_brief, reply = self.parse_brief_reply(reply)
                self.state.cur_state_of_iterations += 1
                return jsonify({"response": reply}), False  

    def return_reply_or_go_to_next_state(self, reply, question_is_answered, message):
        if not question_is_answered:
            return reply
        else:
            #if there are no more questions to ask we call reply recurcively and thus go to the next state
            self.state.state = next_enum(self.state.state)
            return self.reply(message)

conversation = Conversation()

@app.route('/api/send_prompt', methods=['POST'])
def send_prompt():
    data = request.get_json()
    user_prompt = data.get('prompt') 
    
    return conversation.reply(user_prompt)

if __name__ == '__main__':
    app.run(debug=True)