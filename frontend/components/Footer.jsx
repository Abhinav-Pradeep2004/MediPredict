import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} MediPredict. All rights reserved.</p>
        <p>MediPredict – Where AI meets healthcare for smarter diagnostics.</p>

      </div>
    </footer>
  );
}

export default Footer;
