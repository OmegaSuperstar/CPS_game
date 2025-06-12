// Game.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Game.css"; // Import the CSS file

function Game() {
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      navigate("/save", { state: { score: (clicks / 5).toFixed(2) } });
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isRunning, navigate]);

  const handleClick = () => {
    if (!isRunning) {
      setClicks(1); // Count first click
      setTimeLeft(5);
      setIsRunning(true);
    } else {
      setClicks((prev) => prev + 1);
    }
  };

  const secondsElapsed = 5 - timeLeft;
  const averageCPS = secondsElapsed > 0 ? (clicks / secondsElapsed).toFixed(2) : 0;

  return (
    <div className="game-container">
        <button onClick={handleClick} className="fullscreen-button">
          {!isRunning && (
            <div className="overlay-text">Click Me</div>
          )}

        <div className="info-overlay">
          <h1>CPS Test</h1>
          <p>Time Left: {timeLeft}s</p>
          <p>Clicks: {clicks}</p>
          {isRunning && <p>Average CPS: {averageCPS}</p>}
        </div>
      </button>

    </div>
  );
}

export default Game;
