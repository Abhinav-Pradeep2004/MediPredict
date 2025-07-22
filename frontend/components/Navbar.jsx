import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src="/logo.png" alt="MediPredict Logo" className="logo" />
        </Link>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><a href="#about">About</a></li>
        <li>
          <Link to={user ? "/services" : "/login"}>Services</Link>
        </li>
      </ul>

      <div className="navbar-auth">
        {!user ? (
          <>
            <Link className="auth-button login" to="/login">Login</Link>
            <Link className="auth-button signup" to="/signup">Sign Up</Link>
          </>
        ) : (
          <>
            <div className="user-badge">
              {user.displayName
                ? `${user.displayName.split(" ")[0]}`
                : "User"}
            </div>
            <Link className="auth-button logout" onClick={handleLogout}>Logout</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
