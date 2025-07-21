import React from "react";
import "./About.css";

function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <h2>About Us</h2>
        <p>
          Our AI-powered health platform helps you assess symptoms, detect diseases early, and make informed medical decisions.
          We leverage the latest in artificial intelligence to bring accessible and accurate healthcare to everyone.
        </p>
        <div className="about-highlights">
          <div className="highlight">
            <img src="health-insurance.png" alt="AI Diagnosis" />
            <h3>AI-Powered</h3>
            <p>Trained models deliver fast, data-driven predictions.</p>
          </div>
          <div className="highlight">
            <img src="reset-password.png" alt="Secure Data" />
            <h3>Secure & Private</h3>
            <p>Your data is protected with strong encryption.</p>
          </div>
          <div className="highlight">
            <img src="people.png" alt="Accessibility" />
            <h3>Accessible to All</h3>
            <p>Designed for simplicity and ease of use for everyone.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
