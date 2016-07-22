import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Header from '../Header/Header';

import style from './App.css';

export const App = ({ children, loading }) => (
  <div className={style.root}>
    <Header />
    <Link to='/'>Home</Link>
    {loading && 'Loading...'}
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.object,
  loading: PropTypes.bool
};

const mapStateToProps = ({ appState }) => ({
  loading: appState.loading
});

export default connect(mapStateToProps)(App);
