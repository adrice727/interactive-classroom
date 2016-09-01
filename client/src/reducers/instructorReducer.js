import R from 'ramda';

const instructor = (state = null, action) => {
  switch (action.type) {
    case 'SET_INSTRUCTOR':
      return action.instructor;
    case 'SET_INSTRUCTOR_CLASSROOMS':
      return R.merge(state, {classrooms: action.classrooms})
    case 'ADD_INSTRUCTOR_CLASSROOM':
      return R.merge(state, {classrooms: R.concat(state.classrooms, action.classroom)})
    default: return state;
  }
}

export default instructor;
