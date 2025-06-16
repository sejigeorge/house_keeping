import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <span>© {currentYear} </span>
          <a href="https://www.hodo.io" className="company-link">www.hodo.io</a>
          <span className="separator">:</span>
          <span className="tagline">Empowering Entrepreneurs in Healthcare</span>
        </div>
        <div className="footer-right">
          <a href="#shortcuts" className="shortcuts-link">Short Cuts</a>
          <button className="expand-button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 