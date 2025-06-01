import React from 'react';
import '../styles/Header.css';

/**
 * Header component for the Skjortan application
 * Displays the logo, title, and navigation
 */
const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            {/* Use beer emoji as logo */}
            <span className="beer-emoji" role="img" aria-label="Beer">🍺</span>
            <h1 className="site-title">Skjortan</h1>
          </div>
          
          <nav className="main-nav">
            <ul className="nav-list">
              <li className="nav-item">
                <button className="nav-link active">Dashboard</button>
              </li>
              <li className="nav-item">
                <button className="nav-link">About</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
