import React from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import App from './components/App/App';
import Login from './components/Login/Login';
import Classroom from './components/Classroom/Classroom';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    <IndexRedirect to="/login" />
      <Route path="/login(/:role)" component={Login} />
      <Route path="/classroom(:/id)" component={Classroom} />
    </Route>
  </Router>)

export default routes;
