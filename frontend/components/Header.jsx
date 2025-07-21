import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header-section">
      <div className="header-left">
        <h1>Your Health, Our Priority</h1>
        <p>Predict diseases early with AI-powered analysis. Safe, accurate, and fast diagnostics.</p>
        {/*<div className="header-buttons">
          <Link to="/login"><button className="login-button">Login</button></Link>
          <Link to="/signup"><button className="signup-button">Sign Up</button></Link>
        </div> */}
      </div>
      <div className="header-right">
        <img src="medical-prescription.png" alt="Medical Illustration" />
      </div>
    </header>
  );
}

export default Header;
