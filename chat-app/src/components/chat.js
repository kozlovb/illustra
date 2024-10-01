import React, { useState } from 'react';
import './chat.css';  // Make sure chat.css is linked correctly
import axios from 'axios';

const Chat = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInput.trim()) return;

    const newMessages = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);

    setUserInput('');

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/send_prompt', {
        prompt: userInput,
      });
      const assistantMessage = { role: 'assistant', content: response.data.response };
      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      console.error('Error sending prompt:', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={message.role === 'user' ? 'message user' : 'message assistant'}
            >
              {message.content}
            </div>
          ))}
        </div>
        <form className="chat-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Type a message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
