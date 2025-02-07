import React, { useState } from 'react';
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PhoneScreen from './components/PhoneScreen';
import ChatUI from './components/ChatUI';
import Chat from './components/ChatApp';
import notfound from './components/4o4';
import './App.css';



const App = () => {
  return (
    // <div className="App">
    //   {screen === 'PhoneScreen' && <PhoneScreen onSelectApp={handleSelectApp} />}
    //   {screen === 'ChatAppScreen' && <ChatAppScreen onSelectChat={handleSelectChat} />}
    //   {/* {screen === 'Chat' && <Chat characterId={selectedChat} />} */}
    // </div>
    <Router>
      <Routes>
        <Route path="/" element={<PhoneScreen />}>
          <Route path="/chat/:characterId" element={<ChatUI />} />
          {/* <Route path="/projects" element={<ProjectPage />} /> */}
          <Route path="*" element={<notfound />} />
        </Route>
      </Routes>
    </Router>


  );
};

export default App;



