import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ChatUI.css';
import Messages from './Messages';
import Options from './Options';

const initialChatData = {
  orion: [
    { sender: 'Orion', text: "Hey, it's me, Orion. I need your help—Ollie is in danger, and we can't do this alone." }
  ],
  // Add initial messages for other characters here
};

const ChatUI = () => {
  const { characterId } = useParams();
  const [messages, setMessages] = useState(initialChatData[characterId] || []);
  const [input, setInput] = useState('');
  const [options, setOptions] = useState([
    "Wait, what happened to Ollie?", 
    "No way! This sounds dangerous."
  ]);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSendMessage = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { sender: 'user', text: input }]);
      const nextState = getNextState(input);
      setMessages(prevMessages => [...prevMessages, { sender: characterId, text: nextState.message }]);
      setOptions(nextState.options);
      setInput('');
    }
  };

  const getNextState = (userMessage) => {
    const states = {
      'Wait, what happened to Ollie?': {
        message: "He was working on something important and now he's gone missing. The police think I’m involved, but I need to find him and clear my name. Use the Nexus app to access his device.",
        options: ['How do you know this?', 'Where is Ollie?']
      },
      'No way! This sounds dangerous.': {
        message: "Trust me, we need you. Carlos would have wanted us to work together. Your name is the password to unlock Ollie's device using the 'Nexus' app.",
        options: ['Okay, I\'ll do it.', 'Is this some kind of prank?']
      }
      // Add other states here
    };
    return states[userMessage] || { message: "I didn’t understand that.", options: [] };
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender === 'user' ? 'sent' : 'received'}`}>
            {message.text}
            <div className="timestamp">{/* Add timestamp here if needed */}</div>
          </div>
        ))}
      </div>
      <div className="input-box">
        <input 
          type="text" 
          value={input} 
          onChange={handleInputChange} 
          placeholder="Type a message" 
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatUI;
