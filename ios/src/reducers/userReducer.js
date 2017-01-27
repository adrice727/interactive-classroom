import R from 'ramda';

const user = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return action.user;
    case 'ADD_CREDENTIALS':
      return R.assoc('credentials', action.credentials, state);
    case 'LOGOUT_USER':
      return null;
    default:
      return state;
  }
}

export default user;
