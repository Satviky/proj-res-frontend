import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import epg from './4o4'
import './styles.css'
import batfull from '../svgs/batfull.svg';
import batmid2 from '../svgs/batmid2.svg';
import bathalf from '../svgs/bathalf.svg';
import batlow from '../svgs/batlow.svg';
import search from '../svgs/search.svg';
import messagesic from '../svgs/messages.svg'
import ph from '../svgs/phone.svg'
import nxs from '../svgs/nexus.svg'
import d1 from '../svgs/dot.svg'
import la from '../svgs/lock.svg'
import ai1 from '../svgs/settings.svg'
import ai2 from '../svgs/notes.svg'
import App from '../App';

const PhoneScreen = () => {
  const [notificationVisible, setNotificationVisible] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState('full');
  const [currentDate, setCurrentDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const updateTime = () => {
      const timeContainer = document.getElementById('current-time');
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      timeContainer.textContent = `${hours}:${minutes}`;
    };

    const updateDate = () => {
      const dateContainer = document.getElementById('current-date')
      const now = new Date();
      const date = now.getDate();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();
      dateContainer.textContent = `${date}/${month}/${year}`;

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
    updateDate();

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
        <div id='date-container' className="text-5xl text-black font-bold absolute top-20">
          {/* <div className="flex flex-col items-center justify-center h-full mt-12">
  <div className="text-lg mb-4">{currentDate}</div> */}
          <span id="current-date"></span>
        </div>
      }
      {
        <div className='lower-half absolute bottom-2'>
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
              <div className="app-icon h-14 w-14 cursor-pointer rounded-3xl p-4 text-center s-l">
                <a href={"https://www.gsatvik.com"}>
                  <img src={la} alt='locked app' />
                </a>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="mt-4 flex justify-center align-middle">
            <img src={d1} alt='dot' />
          </div>

          {/* separator */}
          <div className="grid grid-cols-4 gap-4 mt-4">
            <div className="app-icon p-4 w-14 h-14 rounded-3xl cursor-pointer app-bg">
              <img src={nxs} alt="Phone Icon" />
              {/* <span>Nexus</span> */}
            </div>
            <div className="app-icon p-4 w-14 h-14 rounded-3xl cursor-pointer app-bg">
              <img src={search} alt="Search Icon" />
              {/* <span>Browser</span> */}
            </div>
            <div className="app-icon p-4 w-14 h-14 rounded-3xl cursor-pointer app-bg">
              <img src={messagesic} alt="Messaging app Icon" />
              {/* <span>message</span> */}
            </div>
            <div className="app-icon p-4 w-14 h-14 rounded-3xl cursor-pointer app-bg">
              <img src={ph} alt="Phone Icon" />
              {/* <span>Phone</span> */}
            </div>
          </div>
        </div>
      }
      {
        // <nav/>
      }
    </div>
  );
};

export default PhoneScreen;
