import React, { Component } from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { logoutUser } from '../../actions/userActions';
import { setInstructor } from '../../actions/instructorActions';
import './Header.css';
import mainLogo from './logo.svg';
import smallLogo from './opentok.png';

const path = () => window.location.pathname.split('/')[1];

const HeaderNav = ({ user, logout, goHome }) => {
  const currentlyHome = path === `${user.role}-home`
  return (
    <span className="Header-Nav">
      { !currentlyHome && <button className="Header-logout btn transparent" onClick={goHome}>Home</button> }
      <button className="Header-logout btn transparent" onClick={logout}>Log out</button>
    </span>
  )
};

const ClassroomInfo = ({classroom}) =>
  <span className="Header-classroom-info">
    <img src={smallLogo} alt="TokBox Logo Small" />
    { `${classroom.title} with ${classroom.instructorName}`}
  </span>;

class Header extends Component {

  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  onLogout() {
    const { dispatch, user } = this.props;
    if (user.role === 'instructor') {
      dispatch(setInstructor(null))
    }
    dispatch(logoutUser());
    browserHistory.push('/');
  }

  goHome() {
    const role = this.props.user.role;
    browserHistory.push(`/${role}-home`);
  }

  render() {
    const { user, classroom } = this.props;
    console.log('what is the classroom???', classroom);
    return (
      <div className="Header">
        <span className="Header-text opentok">
            <img src={smallLogo} alt="TokBox Logo Small" />
            {classroom ? `${classroom.title} with ${classroom.instructorName}` : 'OpenTok Classroom' }
        </span>
        { user ?
          <HeaderNav user={user} logout={this.onLogout} goHome={this.goHome} /> :
          <img className="Header-logo" src={mainLogo} alt="TokBox Logo" />
        }
      </div>
    )
  }
}

const mapStateToProps = state => R.pick(['user', 'classroom'], state);

export default connect(
  mapStateToProps
)(Header);
