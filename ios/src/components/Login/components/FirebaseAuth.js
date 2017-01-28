import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import R from 'ramda'
// import firebase from 'firebase/app';
// import firebaseConfig from '../../../config/firebase';
// import 'firebase/auth';
// import 'firebase/database';
import Firestack from 'react-native-firestack';
import OAuthManager from 'react-native-oauth';
import googleLogo from '../images/google.png';

// firebase.initializeApp(firebaseConfig);

// const provider = new firebase.auth.GoogleAuthProvider();
// provider.addScope('https://www.googleapis.com/auth/userinfo.email');

// const config2 = {
//   google: {
//     callback_url: `com.googleusercontent.apps.433984099756-ouln8ij4tt9tgfv2pvc3csacdoq3eibu:/google`,
//     client_id: '433984099756-ouln8ij4tt9tgfv2pvc3csacdoq3eibu.apps.googleusercontent.com'
//   }
// }



const manager = new OAuthManager('interactiveClassroom')
manager.configure({
  google: {
    callback_url: `com.googleusercontent.apps.433984099756-ouln8ij4tt9tgfv2pvc3csacdoq3eibu:/google`,
    client_id: '433984099756-ouln8ij4tt9tgfv2pvc3csacdoq3eibu.apps.googleusercontent.com',
  }
});


const firestack = new Firestack({ debug: true });
firestack.on('debug', msg => console.log('Received debug message', msg))
firestack.auth.listenForAuth(function(evt) {
  // evt is the authentication event
  // it contains an `error` key for carrying the
  // error message in case of an error
  // and a `user` key upon successful authentication
  if (!evt.authenticated) {
    // There was an error or there is no user
    console.error(evt.error)
  } else {
    // evt.user contains the user details
    console.log('User details', evt.user);
  }
})
.then(() => console.log('Listening for authentication changes'))

class FirebaseAuth extends Component {

  constructor(props) {
    super(props);
    this.authWithFirebase = this.authWithFirebase.bind(this);
  }

  authWithFirebase(role) {
    manager.authorize('google', { scopes: 'email' })
      .then(resp => {
        console.log(111111111, resp);
        firestack.auth.signInWithProvider('google', resp.response.credentials.accessToken, '')
          .then((user) => {
            console.log('UUUUUU', user);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));

    //       firebase.auth().signInWithCredential(provider).then(result => {
    //   this.props.onAuth(role, result);
    // }).catch(error => {
    //   this.props.onError(error);
    // });
  }

  render() {
    const studentAuth = R.partial(this.authWithFirebase, ['student']);
    return (
      <View style={styles.firebaseAuth}>
        <TouchableOpacity onPress={studentAuth}>
          <View>
            <Image style={styles.firebaseAuthBtn} source={googleLogo} />
          </View>
      </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  firebaseAuth: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  firebaseAuthBtn: {
    height: 65,
    width: 65,
    padding: 10,
    margin: 10,
  },
});

export default FirebaseAuth;
