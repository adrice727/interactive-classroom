// @flow
import R from 'ramda';
import { browserHistory } from 'react-router';
import { firebase, provider } from '../services/firebase';
import { validateUser } from '../services/api';
import { logIn, logOut } from './user';

const authError: ActionCreator = (error: boolean): AuthAction => ({
  type: 'AUTH_ERROR',
  error,
});

const signIn: ThunkActionCreator = (user: User): Thunk =>
  (dispatch: Dispatch) => {
    dispatch(authError(false));
    dispatch(logIn(user));
    browserHistory.push('/home');
  };

const signOut: ThunkActionCreator = (): Thunk =>
  (dispatch: Dispatch) => {
    firebase.auth().signOut();
    dispatch(logOut());
    browserHistory.push('/');
  };

const authenticate: ThunkActionCreator = (role: UserRole): Thunk =>
  (dispatch: Dispatch) => {
    const onAuth = ({ user }: FirebaseAuthResponse): Promise<*> =>
      validateUser(R.assoc('name', user.displayName, R.assoc('id', user.uid, R.pick(['uid', 'email', 'photoURL'], user))));

    firebase.auth().signInWithPopup(provider)
      .then(onAuth)
      .then((user: User): void => dispatch(signIn(R.assoc('role', role, user))))
      .catch((error: Error): void => console.log(error));
  };

module.exports = {
  authenticate,
  signOut,
};
