import React, { useState } from 'react';

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}

function datedis() {
  const [currentDate, setCurrentDate] = useState(getDate());
  return (
    <div>
      <h1>Today's Date</h1>
      <p>{currentDate}</p>
    </div>
  );
}

export default datedis;