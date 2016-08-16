import React from 'react';
import './Header.css';
import logo from './logo.svg';


export const Header = () => (
  <div className="Header">
    <span className="Header-text">OpenTok Classroom</span>
    <img className="Header-logo" src={logo} alt="TokBox Logo" />
  </div>
);

export default Header;
