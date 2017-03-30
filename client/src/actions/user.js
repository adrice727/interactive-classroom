// @flow

const logIn: ActionCreator = (user: User): UserAction => ({
  type: 'LOGIN_USER',
  user,
});


const logOut: ActionCreator = (): UserAction => ({
  type: 'LOGOUT_USER',
});

module.exports = {
  logIn,
  logOut,
};

