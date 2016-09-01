import React, { Component } from 'react';
import { withRouter, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import R from 'ramda';
import api from '../../services/api';
import { loginUser } from '../../actions/currentUserActions';
import { setInstructor } from '../../actions/instructorActions';
import './Login.css'
import FirebaseAuth from './components/FirebaseAuth';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { error: null };
    this.onAuth = this.onAuth.bind(this);
    this.onError = this.onError.bind(this);
  }


  onAuth(data) {

    const { dispatch, role } = this.props;

    const user = {
      id: R.path(['user', 'uid'], data),
      name: R.path(['user', 'displayName'], data),
      email: R.path(['user', 'email'], data),
      imageURL: R.path(['user', 'photoURL'], data),
      role
    };

    const login = user => {
      dispatch(loginUser(user));
      if (role === 'instructor') {
        dispatch(setInstructor(user));
      }
      browserHistory.push(`/${role}-home`);
    };

    api.post('user', { user })
      .then(response => login(user))
      .catch(error => console.log(error));

  }

  onError(error) {
    this.setState({ error });
  }

  render() {
    return (
      <div className='Login'>
        <div>
            <div className='Login-main'>
            <div className='Login-content'>
              <div className='Login-component-container'>
                <h2 className='Login-subheader grey'> Sign In</h2>
                <div className='Login-error red'>
                  { this.state.error ? this.state.error : ''}
                </div>
                <FirebaseAuth onAuth={this.onAuth} onError={this.onError} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, { params }) => ({
  user: state.currentUser,
  role: R.path(['role'], params) || 'student'
});

export default withRouter(connect(
  mapStateToProps
)(Login));
