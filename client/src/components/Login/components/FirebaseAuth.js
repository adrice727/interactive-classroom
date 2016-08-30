import React, { Component } from 'react';
import firebase from 'firebase/app';
import firebaseConfig from '../../../config/firebase';
import 'firebase/auth';
import 'firebase/database';
import './FirebaseAuth.css';

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/userinfo.email');

class FirebaseAuth extends Component {

  constructor(props) {
    super(props);
    this.authWithFirebase = this.authWithFirebase.bind(this);
  }

  authWithFirebase() {
    firebase.auth().signInWithPopup(provider).then(result => {
      this.props.onLogin(result);
    }).catch(error => {
      this.props.onError(error);
    });
  }

  render() {
    return (
      <div className='FirebaseAuth'>
        <button className='FirebaseAuth-btn' onClick={this.authWithFirebase}></button>
      </div>
    )
  }
}

export default FirebaseAuth;
