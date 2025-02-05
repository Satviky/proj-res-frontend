import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PhoneScreen from './components/PhoneScreen';
import ChatAppScreen from './components/ChatAppScreen';
// import Chat from './components/Chat';
import './App.css';
import notfound from './components/4o4';



const App = () => {
  const [screen, setScreen] = useState('PhoneScreen');
  const [selectedChat, setSelectedChat] = useState(null);


  const handleSelectApp = (app) => {
    if (app === 'ChatApp') {
      setScreen('ChatAppScreen');
    }
  };
  const handleNotificationClick = () => {
    setScreen('ChatAppScreen');
  };

  const handleSelectChat = (chatId) => {
    setSelectedChat(chatId);
    setScreen('Chat');
  };

  return (
    // <div className="App">
    //   {screen === 'PhoneScreen' && <PhoneScreen onSelectApp={handleSelectApp} />}
    //   {screen === 'ChatAppScreen' && <ChatAppScreen onSelectChat={handleSelectChat} />}
    //   {/* {screen === 'Chat' && <Chat characterId={selectedChat} />} */}
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PhoneScreen />}>
          <Route path="/chat" element={<ChatAppScreen />} />
          <Route path="*" element={<notfound />} />
        </Route>
      </Routes>
    </BrowserRouter>


  );
};

export default App;



