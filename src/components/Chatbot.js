import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post('https://api.yourgpt.ai/chat', {
        message: input,
        chatbotId: 'dd6e8b7e-a7ae-4b72-987a-7bdc6ed5f59e',
      }, {
        headers: {
          'Authorization': `Bearer YOUR_API_KEY`, // Replace with your actual API key
          'Content-Type': 'application/json'
        }
      });

      const botMessage = { sender: 'bot', text: response.data.reply };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setInput('');
  };

  return (
    <div className="chatbot-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chatbot;
