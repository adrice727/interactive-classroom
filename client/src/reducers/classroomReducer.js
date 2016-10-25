import R from 'ramda';

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
      const initialStudentState = { hasQuestion: false, hasAnswer: false };
      return R.assocPath(['students', action.student.id], R.merge(action.student, initialStudentState), state);
    case 'STUDENT_HAS_QUESTION':
      const hasQuestion = !R.path(['students', action.studentId, 'hasQuestion'], state);
      const qSignalData = JSON.stringify({ studentId: action.studentId, hasQuestion });
      if (action.sendSignal) {
        state.session.signal({ data: qSignalData, type: 'studentHasQuestion' });
      }
      return R.assocPath(['students', action.studentId, 'hasQuestion'], hasQuestion, state);
    case 'STUDENT_HAS_ANSWER':
      const hasAnswer = !R.path(['students', action.studentId, 'hasAnswer'], state);
      const aSignalData = JSON.stringify({ studentId: action.studentId, hasAnswer });
      if (action.sendSignal) {
        state.session.signal({ data: aSignalData, type: 'studentHasAnswer' });
      }
      return R.assocPath(['students', action.studentId, 'hasAnswer'], hasAnswer, state);
    case 'RESET_CLASSROOM':
      return null;
    default:
      return state;
  }
}

export default classroom;
