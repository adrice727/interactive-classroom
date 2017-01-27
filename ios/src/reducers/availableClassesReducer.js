const availableClassrooms = (state = {}, action) => {
  switch (action.type) {
    case 'SET_AVAILABLE_CLASSES':
      return Object.assign({}, state, action.classrooms)
    default:
      return state;
  }
}

export default availableClassrooms;
