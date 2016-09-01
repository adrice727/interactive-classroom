const classrooms = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_CLASSROOM':
      return action.user;
    case 'REMOVE_CLASSROOM':
      return null;
    default: return state;
  }
}

export default classrooms;