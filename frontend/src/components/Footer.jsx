import React from "react";
import "../App.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>MyEcommerce</h3>

        <p>Your trusted store for best products.</p>

        <div className="footer-links">
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} MyEcommerce. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
