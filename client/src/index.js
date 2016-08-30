import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
// import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
// import App from './components/App/App';
// import Login from './components/Login/Login';
import routes from './routes'
import configureStore from './configureStore';
import './index.css';

render((
  <Provider store={configureStore()}>
    { routes }
  </Provider>
   ), document.getElementById('root'));

