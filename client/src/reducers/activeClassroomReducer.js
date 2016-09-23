const activeClassroom = (state = null, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_CLASSROOM':
      return Object.assign({}, state, action.classroom)
    default:
      return state;
  }
}

export default activeClassroom;
