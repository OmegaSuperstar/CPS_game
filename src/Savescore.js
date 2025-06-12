import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "./Firebase-config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import './Savescore.css';

function Savescore() {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score || 0;
  const [username, setUsername] = useState("");

  const saveScore = async () => {
    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      alert("Please enter a username.");
      return;
    }

    try {
      await addDoc(collection(db, "leaderboard"), {
        username: trimmedUsername,
        score: parseFloat(score),
        createdAt: serverTimestamp(),
      });
      navigate("/leaderboard");
    } catch (error) {
      console.error("Error saving score:", error);
      alert("Failed to save score. Please try again.");
    }
  };

  return (
    <div className="scoreContainer">
      <h2 className="scoreHeading">Your Score: {score}</h2>
      <input
        className="scoreInput"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div className="buttonGroup">
        <button className="scoreButton" onClick={saveScore}>
          Save Score
        </button>
        <button
          className="scoreButton secondary"
          onClick={() => navigate("/leaderboard")}
        >
          View Leaderboard
        </button>
      </div>
    </div>
  );
  
}

export default Savescore;
