import React, { useState, useEffect, useRef } from "react";
import { Fireworks } from '@fireworks-js/react';

function CounterTimer() {
  const [timeRemaining, setTimeRemaining] = useState("");
  const [showFireworks, setShowFireworks] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Set the countdown to UTC time equivalent of Jan 21, 2025 14:30:00 Bangladesh Time
    // Creating a date object in UTC directly
    const countDownDate = new Date(Date.UTC(2025, 0, 21, 8, 30, 0)).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance < 0) {
        setTimeRemaining("QABOOL!! 1/21/25");
        document.title = "Marriage Day - Time's Up!";
        setShowFireworks(true);  // Enable fireworks when the countdown expires
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      let parts = [];
      if (hours > 0) parts.push(`${hours}H`);
      if (minutes > 0 || hours > 0) parts.push(`${minutes}M`);
      parts.push(`${seconds}S`);

      const timerString = parts.join(' ');
      setTimeRemaining(timerString);
      document.title = timerString + " - Marriage Day";
    };

    const timer = setInterval(updateTimer, 1000);
    return () => {
      clearInterval(timer);
      document.title = "Marriage Day";
    };
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Marriage Day</h1>
        <p className="small-text">Toma & Shajeed</p>
      </header>
      <div className="timer">
        {timeRemaining.split(" ").map((part, index) => (
          <div key={index}>{part}</div>
        ))}
      </div>
      {showFireworks && (
        <Fireworks ref={ref}
        options={{
          sound: {
            enabled: true,
            files: [
              '/sounds/explosion0.mp3',
              '/sounds/explosion1.mp3',
              '/sounds/explosion2.mp3'
            ],            
            volume: {
              min: 4,
              max: 8
            }
          }
        }}style={{
          position: 'fixed', // Use 'fixed' to cover the entire screen
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0 // Ensures it stays behind the content
        }} />
      )}
    </div>
  );
}

export default CounterTimer;
