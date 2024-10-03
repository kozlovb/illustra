from flask import Flask, render_template, jsonify, request
from flask_cors import CORS

import openai

app = Flask(__name__)
CORS(app)

# OpenAI API Key


conversation_history = [{"role": "system", "content": "You are ChatGPT."}]

# Route to render the HTML template
@app.route('/')
def index():
    return render_template('simple.html')
"""
# Route to handle user prompt (this stays the same)
@app.route('/api/send_prompt', methods=['POST'])
def send_prompt():
    data = request.get_json()
    user_prompt = data.get('prompt')

    # Add wrappers or modify the prompt (e.g., add instructions, prefixes, etc.)
    wrapped_prompt = f"ChatGPT, please respond to the following: {user_prompt}"

    # Simulate a response for now
    simulated_response = f"Simulated response to: {wrapped_prompt}"

    return jsonify({
        "response": simulated_response
    })
"""

@app.route('/api/send_prompt', methods=['POST'])
def send_prompt():
    data = request.get_json()
    user_prompt = data.get('prompt')

    # Add wrappers or modify the prompt (e.g., add instructions, prefixes, etc.)
    wrapped_prompt = f"ChatGPT, please respond to the following: {user_prompt}"
    # Add the new user prompt to the conversation history
    conversation_history.append({"role": "user", "content": wrapped_prompt})
    try:
        # Use the new `ChatCompletion.create` method
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # or "gpt-4" if available
            #messages=[
            #    {"role": "system", "content": "You are ChatGPT."},  # Context for ChatGPT
            #    {"role": "user", "content": wrapped_prompt}  # User's input
            #],
            messages = conversation_history,
            max_tokens=100,
            temperature=0.7
        )

        # Get the response content
        reply = response['choices'][0]['message']['content']
        conversation_history.append({"role": "assistant", "content": reply})

    except Exception as e:
        reply = f"An error occurred: {e}"

    return jsonify({
        "response": reply
    })


if __name__ == '__main__':
    app.run(debug=True)
