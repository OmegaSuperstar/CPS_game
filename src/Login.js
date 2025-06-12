import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase-config";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="authContainer">
      <h2>Login</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="authInput"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="authInput"
      />
      <div className="buttonGroup">
        <button className="authButton primary" onClick={login}>
          Login
        </button>
        <button
          className="authButton secondary"
          onClick={() => navigate("/leaderboard")}
        >
          View Leaderboard
        </button>
      </div>
    </div>
  );
}

export default Login;
