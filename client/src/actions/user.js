// @flow

import { firebase, provider } from '../services/firebase';

const login: ActionCreator = (user: User): UserAction => ({
  type: 'LOGIN_USER',
  user
});

const addCredentials: ActionCreator = (credentials: OpentokCredentials): UserAction => ({
  type: 'ADD_CREDENTIALS',
  credentials
});

const logout: ActionCreator = (): UserAction => ({
  type: 'LOGOUT_USER',
  user: null
});


const authenticate: ThunkActionCreator = (role: UserRole): Thunk =>
  (dispach: Dispatch) => {
    firebase.auth().signInWithPopup(provider)
    .then(result => {
      console.log(result);
    });
  }

const authError: ActionCreator = (error: boolean): UserAction => ({
  type: 'AUTHENTICATION_ERROR',
  error
})

module.exports = {
  authenticate,
}
