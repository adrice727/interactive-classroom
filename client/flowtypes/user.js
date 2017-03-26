// @flow
declare type UserRole = 'student' | 'instructor';

declare type User = {
  id: string,
  email: string,
  name: string,
  role: UserRole,
  imageURL?: string,
  credentials?: OpentokCredentials
};

declare type UserState = null | User;

declare type UserAction =
  { type: 'LOGIN_USER', user: User } |
  { type: 'ADD_CREDENTIALS', credentials: OpentokCredentials } |
  { type: 'LOGOUT_USER' } |
  { type: 'AUTHENTICATE_USER', role: UserRole };
