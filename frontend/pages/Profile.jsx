import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css"; // Make sure to import the CSS file

function Profile() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="profile-wrapper">
        <div className="profile-card">
          <h2 className="profile-message">🔒 Please login to view your profile.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <h2 className="profile-greeting">👋 Welcome{user.name}</h2>
        <p className="profile-action">
          Proceed to <a href="/services" className="profile-link">Services</a>
        </p>
      </div>
    </div>
  );
}

export default Profile;
