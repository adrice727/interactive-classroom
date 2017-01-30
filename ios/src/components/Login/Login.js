import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import { connect } from 'react-redux';
import R from 'ramda';
import api from '../../services/api';
import { loginUser } from '../../actions/userActions';
import FirebaseAuth from './components/FirebaseAuth';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { error: null };
    this.onAuth = this.onAuth.bind(this);
    this.onError = this.onError.bind(this);
  }

  static navigationOptions = {
    title: 'OpenTok Classroom',
  }

  componentDidMount() {
    const { user, navigation } = this.props;
    if (user) {
      navigation.navigate('StudentHome');
    }
  }

  onAuth(role, data) {
    const { dispatch, navigation } = this.props;

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
      navigation.navigate('StudentHome');
    };

    api.post('user', R.omit('role', user))
      .then(response => login(user))
      .catch(error => console.log(error));
  }

  onError(error) {
    this.setState({ error });
  }

  render() {
    const providers = {
      google: true,
      facebook: true,
    };
    return (
      <View style={styles.login}>
        <Text style={styles.loginHeader}>
          Login
        </Text>
        <View style={styles.loginComponentContainer}>
          <FirebaseAuth providers={providers} onAuth={this.onAuth} onError={this.onError} />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  login: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loginHeader: {
    fontSize: 24,
    marginBottom: 40,
    fontFamily: 'AppleSDGothicNeo-Light',
    textAlign: 'center',
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(
  mapStateToProps
)(Login);
