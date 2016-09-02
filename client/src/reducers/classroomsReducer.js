const classrooms = (state = null, action) => {
  switch (action.type) {
    case 'SET_AVAILABLE_CLASSROOMS':
      return action.classrooms;
    default: return state;
  }
}

export default classrooms;