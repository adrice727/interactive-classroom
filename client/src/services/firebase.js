// @flow
import firebase from 'firebase/app';
import firebaseConfig from '../config/firebase';
import 'firebase/auth';
import 'firebase/database';

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/userinfo.email');

module.exports = {
  firebase,
  provider,
}
