import React, { Component } from 'react';
import R from 'ramda';
import { path } from '../../services/utility';
import api from '../../services/api';
import './Login.css'
import FirebaseLogin from './components/FirebaseLogin';

const updateUser = data => {
  const user = {
    id: R.path(['user', 'uid'], data),
    name: R.path(['user', 'displayName'], data),
    email: R.path(['user', 'email'], data),
    photoURL: R.path(['user', 'photoURL'], data),
    credential: R.path(['credential'], data)
  };
};


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { error: null };
    this.onLogin = this.onLogin.bind(this);
    this.onError = this.onError.bind(this);

  }

  onLogin(data) {

    const user = {
      id: path('user.uid', data),
      name: path('user.displayName', data),
      email: path('user.email', data),
      imageURL: path('user.photoURL', data)
    }

    const headers = new Headers({ 'Content-Type': 'application/json' });

    const request = new Request(`${api}/user`, {
      method: 'POST',
      mode: 'cors',
      headers,
      body: JSON.stringify({user})
    });

    fetch(request)
      .then(response => response.json().then(x => console.log('HERE AND THERE', x)));

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
                <FirebaseLogin onLogin={this.onLogin} onError={this.onError} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
