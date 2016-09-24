import React, { Component } from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { logoutUser } from '../../actions/userActions';
import { setInstructor } from '../../actions/instructorActions';
import './Header.css';
import logo from './logo.svg';


class Header extends Component {

  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    const { dispatch, user } = this.props;
    if (user.role === 'instructor') {
      dispatch(setInstructor(null))
    }
    dispatch(logoutUser());
    browserHistory.push('/');
  }

  render() {
    const { user } = this.props;
    return (
      <div className="Header">
        <span className="Header-text">OpenTok Classroom</span>
        { user ?
          <button className="Header-logout btn transparent" onClick={this.onLogout}>Log out</button>
          : <img className="Header-logo" src={logo} alt="TokBox Logo" />
        }
      </div>
    )
  }

}

const mapStateToProps = (state) => R.pick(['user'], state);

export default connect(
  mapStateToProps
)(Header);
