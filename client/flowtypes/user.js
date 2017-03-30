// @flow
declare type UserRole = 'student' | 'instructor';

declare type User = {
  id: string,
  email: string,
  name: string,
  role: UserRole,
  photoURL?: string,
  credentials?: OpentokCredentials,
  authenticationError: boolean
};

declare type UserState = null | User;

declare type UserAction =
  { type: 'LOGIN_USER', user: User } |
  { type: 'LOGOUT_USER' };
