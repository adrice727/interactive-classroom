import React, { Component } from 'react';
import firebase from 'firebase/app';
import firebaseConfig from '../../../config/firebase';
import 'firebase/auth';
import 'firebase/database';
import './FirebaseLogin.css';

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/userinfo.email');

class FirebaseLogin extends Component {

  constructor(props) {
    super(props);
    this.loginWithFirebase = this.loginWithFirebase.bind(this);
  }

  loginWithFirebase() {
    firebase.auth().signInWithPopup(provider).then(result => {
      console.log('auth result', result);
      this.props.onLogin(result);
    }).catch(error => {
      this.props.onError(error);
    });
  }

  render() {
    return (
      <div className='FirebaseLogin'>
        <button className='FirebaseLogin-btn' onClick={this.loginWithFirebase}></button>
      </div>
    )
  }
}

export default FirebaseLogin;
