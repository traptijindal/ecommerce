import React from 'react';
import './Footer.css';
import footer_logo from "../../assets/logo_big.png";
import insta_icon from "../../assets/instagram_icon.png";
import pinterest_icon from "../../assets/pintester_icon.png";
import whatsaap_icon from "../../assets/whatsapp_icon.png";

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-content">
        <div className="footer-logo">
          <img src={footer_logo} alt="" />
          <p>SwiftMart</p>
        </div>

        <ul className="footer-links">
          <li>Shop</li>
          <li>Men</li>
          <li>Women</li>
          <li>About Us</li>
          <li>Contact</li>
        </ul>

        <div className="footer-social-icon">
          <a href="#"><img src={insta_icon} alt="Instagram" /></a>
          <a href="#"><img src={pinterest_icon} alt="Pinterest" /></a>
          <a href="#"><img src={whatsaap_icon} alt="WhatsApp" /></a>
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>© 2025 SwiftMart. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;