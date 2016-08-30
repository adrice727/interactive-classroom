export const loginUser = user => {
  console.log(`login called with ${user}`);
  return({
  type: 'LOGIN_USER',
  user
});
};

export const logoutUser = () => ({
  type: 'LOGOUT_USER'
});