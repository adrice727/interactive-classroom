// @flow
declare type UserRole = 'student' | 'instructor';

declare type User = {
  id: string,
  email: string,
  name: string,
  role: UserRole,
  imageURL?: string,
  credentials?: OpentokCredentials,
  authenticationError: boolean
};

declare type UserState = null | User;

declare type FirebaseAuthResponse = {
  user: {
    uid: string,
    email: string,
    displayName: string,
    photoURL: string
  }
};

declare type UserAction =
  { type: 'LOGIN_USER', user: User } |
  { type: 'LOGOUT_USER' } |
  { type: 'ADD_CREDENTIALS', credentials: OpentokCredentials } |
  { type: 'AUTHENTICATE_USER', role: UserRole } |
  { type: 'AUTHENTICATION_ERROR', error: boolean } ;
