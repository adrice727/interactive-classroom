// @flow
import R from 'ramda';
import { firebase, provider } from '../services/firebase';
import { validateUser } from '../services/api';
import { browserHistory } from 'react-router'

const login: ThunkActionCreator = (user: User): Thunk =>
  (dispatch: Dispatch) => {
    dispatch(authenticationError(false))
    dispatch({ type: 'LOGIN_USER', user });
    browserHistory.push(`/${user.role}-home`);
  };

const addCredentials: ActionCreator = (credentials: OpentokCredentials): UserAction => ({
  type: 'ADD_CREDENTIALS',
  credentials
});

const logout: ActionCreator = (): UserAction => ({
  type: 'LOGOUT_USER',
  user: null
});

const authenticationError: ActionCreator = (error: boolean): UserAction => ({
  type: 'AUTHENTICATION_ERROR',
  error
});

const authenticate: ThunkActionCreator = (role: UserRole): Thunk =>
  (dispatch: Dispatch) => {
    const onAuth = ({ user } : FirebaseAuthResponse): Promise<*> =>
      validateUser(R.assoc('name', user.displayName, R.assoc('id', user.uid, R.pick(['uid', 'email', 'photoURL'], user))));

    firebase.auth().signInWithPopup(provider)
    .then(onAuth)
    .then(user => dispatch(login(R.assoc('role', role, user))))
    .catch(error => console.log(error));
  };


module.exports = {
  authenticate,
}
