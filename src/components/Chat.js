import React, { useState, useEffect } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const response = await fetch('http://127.0.0.1:8080/messages');
    const data = await response.json();
    setMessages(data);
  };

  const sendMessage = async () => {
    const newMessage = {
      sender: 'Player',
      content: message,
      timestamp: new Date().toISOString(),
    };

    await fetch('http://127.0.0.1:8080/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMessage),
    });

    setMessage('');
    fetchMessages();
  };

  return (
    <div>
      <div id="chat">
        {messages.map((msg, index) => (
          <p key={index}>{msg.sender}: {msg.content}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
