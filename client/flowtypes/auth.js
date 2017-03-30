// @flow
/* eslint no-undef: "off" */
/* beautify preserve:start */

declare type AuthState = {
  error: boolean
 };

declare type FirebaseAuthResponse = {
  user: {
    uid: string,
    email: string,
    displayName: string,
    photoURL: string
  }
};

declare type AuthAction = { type: 'AUTH_ERROR', error: boolean };
