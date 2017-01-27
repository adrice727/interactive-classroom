import React, { Component } from 'react';
import R from 'ramda'
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

  authWithFirebase(role) {
    firebase.auth().signInWithPopup(provider).then(result => {
      this.props.onAuth(role, result);
    }).catch(error => {
      this.props.onError(error);
    });
  }

  render() {
    const studentAuth = R.partial(this.authWithFirebase, ['student']);
    const instructorAuth = R.partial(this.authWithFirebase, ['instructor']);
    return (
      <div className='FirebaseAuth'>
        <button className='FirebaseAuth-btn student' onClick={studentAuth}>Student</button>
        <button className='FirebaseAuth-btn instructor' onClick={instructorAuth}>Instructor</button>
      </div>
    )
  }
}

export default FirebaseAuth;
