import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "./Firebase-config";
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import './Savescore.css';

function Savescore() {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score || 0;
  const { user } = useAuth();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchUsername = async () => {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setUsername(userDoc.data().username || "Unknown");
      } else {
        setUsername("Unknown");
      }
    };

    fetchUsername();
  }, [user, navigate]);

  const saveScore = async () => {
    try {
      await addDoc(collection(db, "leaderboard"), {
        username,
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
      <p>Username: <strong>{username}</strong></p>
      <div className="buttonGroup">
        <button className="scoreButton" onClick={saveScore}>
          Save Score
        </button>
        <button
          className="scoreButton secondary"
          onClick={() => navigate("/leaderboard")}
        >
          Skip & View Leaderboard
        </button>
      </div>
    </div>
  );
}

export default Savescore;
