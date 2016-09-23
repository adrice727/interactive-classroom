import R from 'ramda';

const currentUser = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return action.user;
    case 'ADD_CREDENTIALS':
      return R.merge(state, {credentials: action.credentials})
    case 'LOGOUT_USER':
      return null;
    default:
      return state;
  }
}

export default currentUser;
