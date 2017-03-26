import React, { Component } from 'react';
import R from 'ramda'
import firebase from '../../../services/firebase';
import './FirebaseAuth.css';

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
