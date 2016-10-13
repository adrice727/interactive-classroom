import R from 'ramda'

const classroom = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_CLASSROOM':
      return R.merge(state, action.classroom);
    case 'SET_CLASSROOM_SESSION':
      return R.assoc('session', action.session, state);
    case 'SET_CLASSROOM_CONNECTED':
      return R.assoc('connected', action.connected, state);
    case 'INSTRUCTOR_JOINED_CLASSROOM':
      return R.assoc('instructor', action.instructor, state);
    case 'STUDENT_JOINED_CLASSROOM':
      return R.assocPath(['students', action.student.id], action.student, state);
    case 'RESET_CLASSROOM':
      return null;
    default:
      return state;
  }
}

export default classroom;
