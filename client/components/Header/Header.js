import React from 'react';

import style from './Header.css';

export const Header = () => (
  <div className={style.root}>
    <span className={style.text}>OpenTok Classroom</span>
    <img className={style.logo} src={require('../../images/logo.svg')} alt="TokBox Logo" />
  </div>
);

export default Header;
