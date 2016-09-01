export const loginUser = user => ({
  type: 'LOGIN_USER',
  user
});

export const setInstructorClassrooms = classrooms => ({
  type: 'SET_INSTRUCTOR_CLASSROOMS',
  classrooms
});

export const logoutUser = () => ({
  type: 'LOGOUT_USER',
  user: null
});
