import React, { useEffect, useState } from "react";
import "./Count.css"; // Make sure to import the CSS

const Count = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const dateString = currentTime.toLocaleDateString();
  const timeString = currentTime.toLocaleTimeString();

  return (
    <div className="count-container">
      <div className="count-box">
        <h1>Welcome to <span className="highlight">CHARUSAT</span> 🎓</h1>
        <h2>📅 {dateString}</h2>
        <h2>⏰ {timeString}</h2>
      </div>
    </div>
  );
};

export default Count;
