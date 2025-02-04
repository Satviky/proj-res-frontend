import React, { useState, useEffect } from 'react';

const getCurrentDateAndDay = () => {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return now.toLocaleDateString(undefined, options);
};

const Home = () => {
  const [dateAndDay, setDateAndDay] = useState(getCurrentDateAndDay());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateAndDay(getCurrentDateAndDay());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-xl">{dateAndDay}</h1>
      <p>Welcome to the Home Page!</p>
    </div>
  );
};

export default Home;
