import React, { useState } from 'react';
import PhoneScreen from './components/PhoneScreen';
import ChatAppScreen from './components/ChatAppScreen';
// import Chat from './components/Chat';
import './App.css';



const App = () => {
  const [screen, setScreen] = useState('PhoneScreen');
  const [selectedChat, setSelectedChat] = useState(null);


  const handleSelectApp = (app) => {
    if (app === 'ChatApp') {
      setScreen('ChatAppScreen');
    }
  };

  const handleSelectChat = (chatId) => {
    setSelectedChat(chatId);
    setScreen('Chat');
  };

  return (
    <div className="App">
      {screen === 'PhoneScreen' && <PhoneScreen onSelectApp={handleSelectApp} />}
      {screen === 'ChatAppScreen' && <ChatAppScreen onSelectChat={handleSelectChat} />}
      {/* {screen === 'Chat' && <Chat characterId={selectedChat} />} */}
    </div>

    
  );
};

export default App;



