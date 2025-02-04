import React, { useEffect, useState } from 'react';
import './styles.css'
import batfull from '../svgs/batfull.svg';
import batmid2 from '../svgs/batmid2.svg';
import bathalf from '../svgs/bathalf.svg';
import batlow from '../svgs/batlow.svg';

const PhoneScreen = () => {
  const [notificationVisible, setNotificationVisible] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState('full');

  useEffect(() => {
    const updateTime = () => {
      const timeContainer = document.getElementById('current-time');
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      timeContainer.textContent = `${hours}:${minutes}`;
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
        setBatteryLevel('low')
      }
      // document.getElementById('bat-low').style.display = batl <= 25 ? 'block' : 'none';
    };

    setInterval(updateTime, 1000);
    updateTime();

    navigator.getBattery().then(updateBattery).catch((error) => {
      console.log("Error: " + error);
    });
  }, []);

  const handleNotificationClick = () => {
    setNotificationVisible(false);
  };
  const getBatteryIcon = () => {
    switch (batteryLevel) {
      case 'full':
        return batfull;
      case 'threeFour':
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
    <div className="phone-screen bg-gray-900 text-white h-screen flex flex-col items-center justify-center relative">
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
      {
      // (notificationVisible || !notificationVisible) && 
      <div className="app-a text-center mt-4">
        This is app container
      </div>}
      
      {
        <div className="grid grid-cols-4 gap-4 mt-4 absolute bottom-2">
        <div className="app-icon bg-gray-700 p-4 rounded cursor-pointer">
          <span>1</span>
        </div>
        <div className="app-icon bg-gray-700 p-4 rounded cursor-pointer">
          <span>2</span>
        </div>
        <div className="app-icon bg-gray-700 p-4 rounded cursor-pointer">
          <span>3</span>
        </div>
        <div className="app-icon bg-gray-700 p-4 w-14 h-14 rounded cursor-pointer">
          <span>4</span>
        </div>
      </div>
      }

    </div>
  );
};

export default PhoneScreen;
