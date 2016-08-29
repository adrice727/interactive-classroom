import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import App from './components/App/App';
import Login from './components/Login/Login';
import './index.css';


render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    <IndexRedirect to="/login" />
      <Route path="/login(/:role)" component={Login} />
    </Route>
  </Router>
), document.getElementById('root'))
