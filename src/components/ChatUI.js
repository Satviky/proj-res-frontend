import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
// import './ChatUI.css';
import Messages from './Messages';
import Options from './Options';


// New update will be tried



const initialChatData = {
  orion: [
    { sender: 'Orion', text: "Hey, I am Orion. I need your help. It's an emergency. \n Ollie gave me a deck of Uno card and in one of the card your number was written" }
  ],
  // Add initial messages for other characters here
};

const ChatUI = () => {
  const { characterId } = useParams();
  const [messages, setMessages] = useState(initialChatData[characterId] || []);
  const [options, setOptions] = useState([
    "Wait, what happened to Ollie?", 
    "No way! This sounds dangerous."
  ]);

  const handleOptionClick = (option) => {
    setMessages(prevMessages => [...prevMessages, { sender: 'user', text: option }]);
    const nextState = getNextState(option);
    setMessages(prevMessages => [...prevMessages, { sender: characterId, text: nextState.message }]);
    setOptions(nextState.options);
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
    return states[userMessage] || { message: "Orion is offline", options: [] };
  };

  return (
    <div className="flex flex-col set-screen bg-gray-900 text-white chat-app">
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className={`my-2 p-3 max-w-xs rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-700 text-white self-start'}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-800 bg-gray-800">
        <div className="flex flex-col">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className="mb-2 p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
