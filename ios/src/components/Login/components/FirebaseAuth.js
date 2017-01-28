import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import R from 'ramda'
import Firestack from 'react-native-firestack';
import OAuthManager from 'react-native-oauth';
import googleLogo from '../images/google.png';
import facebookLogo from '../images/facebook.png';

const manager = new OAuthManager('interactiveClassroom')
manager.configure({
  google: {
    callback_url: `com.googleusercontent.apps.433984099756-ouln8ij4tt9tgfv2pvc3csacdoq3eibu:/google`,
    client_id: '433984099756-ouln8ij4tt9tgfv2pvc3csacdoq3eibu.apps.googleusercontent.com',
  },
  facebook: {
    client_id: '1325352990865157',
    client_secret: '1e788777811a2e429283751415b28965'
  }
});

const firestack = new Firestack();
firestack.on('debug', msg => console.log('Received debug message', msg))

const authButton = (provider, action) => {
  const auth = R.partial(action, [provider]);
  const icons = {
    google: googleLogo,
    facebook: facebookLogo
  }
  return (
    <TouchableOpacity onPress={auth}>
        <View>
          <Image style={styles.firebaseAuthBtn} source={icons[provider]} />
        </View>
    </TouchableOpacity>
  )
};

class FirebaseAuth extends Component {

  constructor(props) {
    super(props);
    this.authWithFirebase = this.authWithFirebase.bind(this);
  }

  authWithFirebase(role, provider) {
    const { onAuth, onError } = this.props;
    const scopes = provider === 'google' ? {scopes: 'email'} : undefined;
    manager.authorize(provider, scopes)
      .then(({ response }) => {
        const token = R.path(['credentials', 'accessToken'], response);
        firestack.auth.signInWithProvider(provider, token, '')
          .then(R.partial(onAuth, [role]))
          .catch(onError);
      })
      .catch(onError);
  }

  render() {
    const studentAuth = R.partial(this.authWithFirebase, ['student']);
    const { google, facebook } = this.props.providers;
    return (
      <View style={styles.firebaseAuth}>
        { facebook && authButton('facebook', studentAuth) }
        { google && authButton('google', studentAuth) }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  firebaseAuth: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  firebaseAuthBtn: {
    height: 65,
    width: 65,
    marginRight: 10,
    marginLeft: 10,
  },
});

export default FirebaseAuth;
