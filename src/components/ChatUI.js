import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Messages from './Messages';
import Options from './Options';
import './ChatUI.css';

const initialChatData = {
    orion: [
        { sender: 'Orion', text: "Hey, it's me, Orion. I need your help—Ollie is in danger, and we can't do this alone." }
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

  useEffect(() => {
      // Update messages if characterId changes
      setMessages(initialChatData[characterId] || []);
  }, [characterId]);

  const handleUserResponse = (response) => {
      setMessages([...messages, { sender: 'user', text: response }]);
      const nextState = getNextState(response);
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
      return states[userMessage] || { message: "I didn’t understand that.", options: [] };
  };

  return (
      <div className="chat-ui bg-gray-900 text-white h-screen flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Chat with {characterId.charAt(0).toUpperCase() + characterId.slice(1)}</h1>
          <div className="chat-box bg-gray-800 p-4 rounded mt-4 w-3/4">
              <Messages messages={messages} />
              <Options options={options} handleResponse={handleUserResponse} />
          </div>
      </div>
  );
};

export default ChatUI;
