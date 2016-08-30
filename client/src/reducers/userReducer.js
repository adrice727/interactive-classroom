const user = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return action.user;
    case 'LOGOUT_USER':
      return null;
    default: return state;
  }
}

export default user;