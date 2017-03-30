import React from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import App from './components/App/App';
import Login from './components/Login/Login';
import AuthRoutes from './components/AuthRoutes/AuthRoutes';
import Home from './components/Home/Home';
import InstructorHome from './components/InstructorHome/InstructorHome';
// import StudentHome from './components/Home/components/StudentHome/StudentHome';
import Classroom from './components/Classroom/Classroom';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/login" />
      <Route path="/login" component={Login} />
      <Route component={AuthRoutes}>
        <Route path="/home" component={Home} />
        <Route path="classroom/:id" component={Classroom} />
      </Route>
    </Route>
  </Router>);

export default routes;
