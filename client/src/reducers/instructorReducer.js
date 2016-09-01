import R from 'ramda';

const instructor = (state = null, action) => {
  switch (action.type) {
    case 'SET_INSTRUCTOR':
      return action.instructor;
    case 'SET_INSTRUCTOR_CLASSROOMS':
      return R.merge(state, {classrooms: action.classrooms})
    case 'ADD_INSTRUCTOR_CLASSROOM':
      console.log('before', state);
      const after = R.merge(state, {classrooms: R.merge(state.classrooms, action.classroom)})
      console.log('after', after);
      return after;
    case 'REMOVE_INSTRUCTOR_CLASSROOM':
      return R.merge(state, {classrooms: R.omit([action.classroomId], state.classrooms)})
    default: return state;
  }
}

export default instructor;
