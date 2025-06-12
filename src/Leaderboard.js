import React, { useEffect, useState } from "react";
import { db } from "./Firebase-config";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import './Leaderboard.css';

function Leaderboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      const q = query(
        collection(db, "leaderboard"),
        orderBy("score", "desc"),
        limit(10)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => {
        const entry = doc.data();
        return {
          ...entry,
          score: Number(entry.score) || 0,
        };
      });
      setScores(data);
    };

    fetchScores();
  }, []);

  return (
    <div className="leaderboardDiv">
      <h1>Leaderboard</h1>
      <ol>
        {scores.map((entry, index) => {
          let className = "";
          if (index === 0) className = "gold";
          else if (index === 1) className = "silver";
          else if (index === 2) className = "bronze";

          return (
            <li key={index} className={className}>
              {entry.username || "Unknown"} - {entry.score}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default Leaderboard;
