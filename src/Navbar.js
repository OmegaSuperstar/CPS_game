import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav style={{ padding: "10px", background: "#ddd", display: "flex", justifyContent: "space-between" }}>
      <div>
        <Link to="/" style={{ margin: "0 10px" }}>Game</Link>
        <Link to="/leaderboard" style={{ margin: "0 10px" }}>Leaderboard</Link>
      </div>
      <div>
        {user ? (
          <>
            <span style={{ marginRight: "10px" }}>{user.email}</span>
            <button onClick={() => { logout(); navigate("/"); }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ margin: "0 10px" }}>Login</Link>
            <Link to="/register" style={{ margin: "0 10px" }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
