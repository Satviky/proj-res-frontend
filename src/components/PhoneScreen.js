import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import './styles.css'
import batfull from '../svgs/batfull.svg';
import batmid2 from '../svgs/batmid2.svg';
import bathalf from '../svgs/bathalf.svg';
import batlow from '../svgs/batlow.svg';
import search from '../svgs/search.svg';
import messagesic from '../svgs/messages.svg';
import ph from '../svgs/phone.svg';
import nxs from '../svgs/nexus.svg';
import d1 from '../svgs/dot.svg';
import la from '../svgs/lock.svg';
import ai1 from '../svgs/settings.svg';
import ai2 from '../svgs/notes.svg';

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${date}/${month}/${year}`;
}

const PhoneScreen = () => {
  const [notificationVisible, setNotificationVisible] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState('full');
  const [currentDate, setCurrentDate] = useState(getDate());
  const navigate = useNavigate();
  const location = useLocation

  useEffect(() => {
    const updateTime = () => {
      const timeContainer = document.getElementById('current-time');
      if (timeContainer) {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        timeContainer.textContent = `${hours}:${minutes}`;
      }
    };

    const updateBattery = (battery) => {
      const batl = battery.level * 100;
      if (batl > 75) {
        setBatteryLevel('full');
      } else if (batl > 50 && batl <= 75) {
        setBatteryLevel('midfull');
      } else if (batl > 25 && batl <= 50) {
        setBatteryLevel('half');
      } else if (batl <= 25) {
        setBatteryLevel('low');
      }
    };

    setInterval(updateTime, 1000);
    updateTime();

    navigator.getBattery().then(updateBattery).catch((error) => {
      console.log("Error: " + error);
    });
  }, []);

  const handleNotificationClick = () => {
    setNotificationVisible(false);
    navigate('/chat/orion');
  };

  const getBatteryIcon = () => {
    switch (batteryLevel) {
      case 'full':
        return batfull;
      case 'midfull':
        return batmid2;
      case 'half':
        return bathalf;
      case 'low':
        return batlow;
      default:
        return batfull;
    }
  };

  return (
    <div className="phone-screen bg-gray-900 text-white set-screen flex flex-col items-center justify-center relative">
      <div className="status-bar flex justify-between items-center w-full px-4 py-2 bg-gray-800 absolute top-0 left-0">
        <div id="time-container" className="text-lg font-bold">
          <span id="current-time"></span>
        </div>
        <div id="battery-status" className="text-lg">
          <img src={getBatteryIcon()} alt="Battery Icon" className="w-6 h-6 inline-block" />
        </div>
      </div>
      {notificationVisible && (
        <div className="notification bg-blue-600 text-white px-4 py-2 mt-4 rounded cursor-pointer absolute top-8" onClick={handleNotificationClick}>
          New message from Unknown
        </div>
      )}
      <div id="date-cont" className="text-5xl font-bold text-black absolute top-20">
        <span id="current-date">{currentDate}</span>
      </div>
      <div className="lower-half absolute bottom-2">
        <div>
          <div className="mt-4 grid grid-cols-4 gap-4">
            <div className="app-icon h-14 w-14 cursor-pointer rounded-3xl p-4 text-center">
              <img src={la} alt='locked app' />
            </div>
            <div className="app-icon h-14 w-14 cursor-pointer rounded-3xl p-4 text-center">
              <img src={la} alt='locked app' />
            </div>
            <div className="app-icon h-14 w-14 cursor-pointer rounded-3xl p-4 text-center">
              <img src={la} alt='locked app' />
            </div>
            <div className="app-icon h-14 w-14 cursor-pointer rounded-3xl p-4 text-center">
              <img src={la} alt='locked app' />
            </div>
            <div className="app-icon h-14 w-14 cursor-pointer rounded-3xl p-4 text-center">
              <img src={la} alt='locked app' />
            </div>
            <div className="app-icon h-14 w-14 cursor-pointer rounded-3xl p-4 text-center">
              <img src={ai2} alt='Notes app' />
            </div>
            <div className="app-icon h-14 w-14 cursor-pointer rounded-3xl p-4 text-center">
              <img src={ai1} alt='Settings app' />
            </div>
            <a href="https://www.gsatvik.com" className="app-icon h-14 w-14 cursor-pointer rounded-3xl p-4 text-center s-l">
              <img src={la} alt='locked app' />
            </a>
          </div>
        </div>
        <div className="mt-4 flex justify-center align-middle">
          <img src={d1} alt='dot' />
        </div>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="app-icon p-4 w-14 h-14 rounded-3xl cursor-pointer app-bg">
            <img src={nxs} alt="Phone Icon" />
          </div>
          <div className="app-icon p-4 w-14 h-14 rounded-3xl cursor-pointer app-bg">
            <img src={search} alt="Search Icon" />
          </div>
          <Link to="/chat" className="app-icon p-4 w-14 h-14 rounded-3xl cursor-pointer app-bg">
            <img src={messagesic} alt="Messaging app Icon" />
          </Link>
          <div className="app-icon p-4 w-14 h-14 rounded-3xl cursor-pointer app-bg">
            <img src={ph} alt="Phone Icon" />
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default PhoneScreen;
