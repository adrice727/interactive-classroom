import R from 'ramda';

const user = (state: UserState = null, action: UserAction): UserState => {
  switch (action.type) {
    case 'LOGIN_USER':
      return action.user;
    case 'LOGOUT_USER':
      return null;
    case 'ADD_CREDENTIALS':
      return R.assoc('credentials', action.credentials, state);
    default:
      return state;
  }
};

export default user;
