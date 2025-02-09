import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
// import './ChatUI.css';
import Messages from './Messages';
import Options from './Options';


// New update will be tried



const initialChatData = {
  orion: [
    { sender: 'Orion', text: "Hey, I am Orion. I need your help. Ollie gave me this phone to use in emergency and when i opened it, it had only your number. you are kimberly Goodall, right?" }
  ],
  kira: [
    {sender: 'Kira', text:"Hi, I am Kira. I am just texting to reassure you that Orion will be safe here. Ollie already told me to make this place ready to accomodate Orion."}
  ],
  // Add initial messages for other characters here
};

const ChatUI = () => {
  const { characterId } = useParams();
  const [messages, setMessages] = useState(initialChatData[characterId] || []);
  const [options, setOptions] = useState([
    "Yes, why and how do you know Ollie?", 
    "Sorry, but I don't think i will be of some help."
  ]);

  const handleOptionClick = (option) => {
    setMessages(prevMessages => [...prevMessages, { sender: 'user', text: option }]);
    const nextState = getNextState(option);
    setMessages(prevMessages => [...prevMessages, { sender: characterId, text: nextState.message }]);
    setOptions(nextState.options);
  };

  const getNextState = (userMessage) => {
    const states = {
      'Yes, why and how do you know Ollie?': {
        message: "Kimberly please. I am accused of kidnapping my boss and they are thinking that i have killed him too. His body or his whereabouts is not known but they think that I am the one who is behind all this. Please, help me.",
        options: ['Wait, What?', 'Where is Ollie?']
      },
      'Sorry, but I don\'t think i will be of some help.': {
        message: "Kimberly please. I am accused of kidnapping my boss and they are thinking that i have killed him too. His body or his whereabouts is not known but they think that I am the one who is behind all this. Please, help me.",
        options: ['Wait, What?', 'Where is Ollie?']
      },
      'Wait, What?': {
        message: "Ollie was the one who was working on this case. He told me already that maybe they will start to think that I murdered my boss and this is why he gave me this phone for emergency. Trust me this is not what it looks like. I am really being framed and I am not the one behind this.",
        options: ['You do realise that you are repeating one thing many times?', 'I understand your situation you don\'t need to reframe it in 4-5 lines']
      },
      'Where is Ollie?': {
        message: " I don\'t know where he went. I only know that before he got vanished he gave me this phone and i started it and it had only one contact saved and I texted on that number.",
        options: ['I see. Is there anything else in this phone?', 'Where do you think he can be?']
      },
      'You do realise that you are repeating one thing many times?': {
        message: " I am sorry for that. I also found a small paper in the backcover it have something written on it. X:16.02,Y:20.26",
        options: ['I see. Is there anything else in this phone?', 'Where do you think he can be?']
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
