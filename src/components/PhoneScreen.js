import React, { useEffect, useState } from 'react';

const PhoneScreen = () => {
    const [notificationVisible, setNotificationVisible] = useState(true);

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
            document.getElementById('bat-full').style.display = batl > 75 ? 'block' : 'none';
            document.getElementById('bat-three-four').style.display = batl > 50 && batl <= 75 ? 'block' : 'none';
            document.getElementById('bat-half').style.display = batl > 25 && batl <= 50 ? 'block' : 'none';
            document.getElementById('bat-low').style.display = batl <= 25 ? 'block' : 'none';
        };

        setInterval(updateTime, 1000);
        updateTime(); // Initial call to display time immediately

        navigator.getBattery().then(updateBattery).catch((error) => {
            console.log("Error: " + error);
        });
    }, []);

    const handleNotificationClick = () => {
        setNotificationVisible(false);
    };

    return (
        <div className="phone-screen bg-gray-900 text-white h-screen flex flex-col items-center justify-center">
            <div className="status-bar flex justify-between items-center w-full px-4 py-2 bg-gray-800">
                <div id="time-container" className="text-lg font-bold">
                    <span id="current-time"></span>
                </div>
                <div id="battery-status" className="text-lg">
                    <span id="bat-full" style={{ display: 'none' }}>🔋</span>
                    <span id="bat-three-four" style={{ display: 'none' }}>🔋</span>
                    <span id="bat-half" style={{ display: 'none' }}>🔋</span>
                    <span id="bat-low" style={{ display: 'none' }}>🔋</span>
                </div>
            </div>
            {notificationVisible && (
                <div className="notification bg-blue-600 text-white px-4 py-2 mt-4 rounded cursor-pointer" onClick={handleNotificationClick}>
                    New message from Orion
                </div>
            )}
            {!notificationVisible && <div className="text-center mt-4">Phone apps will be displayed here</div>}
        </div>
    );
};

export default PhoneScreen;
