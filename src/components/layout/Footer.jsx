import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => (
  <footer className="footer">
    <div>
      <Link to="/about">About</Link> | 
      <Link to="/contact"> Contact</Link>
    </div>
    <div className="footer-credit">
      &copy; {new Date().getFullYear()} MiSOS. All rights reserved.
    </div>
  </footer>
);

export default Footer;