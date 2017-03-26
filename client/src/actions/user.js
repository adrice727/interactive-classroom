// @flow
import firebase from '../services/firebase';
const login = user => ({
  type: 'LOGIN_USER',
  user
});

const addCredentials = credentials => ({
  type: 'ADD_CREDENTIALS',
  credentials
});

const logout = () => ({
  type: 'LOGOUT_USER',
  user: null
});

// const auth

const authenticate = () => ({
  type: 'LOGOUT_USER',
  user: null
});


module.exports = {
  authenticate,
}
