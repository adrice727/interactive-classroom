import R from 'ramda';
import { signal } from '../services/opentok';

const getConnection = (role, id) => {
  const type = role === 'student' ? 'students' : 'instructor';
  return R.path([type, id, 'stream', 'connection']);
};

const classroom = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_CLASSROOM':
      return R.merge(state, action.classroom);
    case 'SET_CLASSROOM_CONNECTED':
      return R.assoc('connected', action.connected, state);
    case 'INSTRUCTOR_JOINED_CLASSROOM':
      return R.assoc('instructor', action.instructor, state);
    case 'INSTRUCTOR_LEFT_CLASSROOM':
      return R.assoc('instructor', null, state);
    case 'INSTRUCTOR_TAKES_QUESTION':
      signal('takeQuestion', { studentId: action.studentId }, getConnection('student', action.studentId)(state));
      return state;
    case 'INSTRUCTOR_TAKES_ANSWER':
      signal('takeAnswer', { studentId: action.studentId }, getConnection('student', action.studentId)(state));
      return state;
    case 'STUDENT_JOINED_CLASSROOM':
      const initialStudentState = { status: { hasQuestion: false, hasAnswer: false, asking: false, answering: false } };
      return R.assocPath(['students', action.student.id], R.merge(action.student, initialStudentState), state);
    case 'STUDENT_LEFT_CLASSROOM':
      const currentStudents = state.students;
      return R.assoc('students', R.omit([action.studentId], currentStudents), state);
    case 'UPDATE_STUDENT_STATUS':
      const currentStatus = R.path(['students', action.studentId, 'status'], state);
      const status = R.pick(['hasQuestion', 'hasAnswer', 'asking', 'answering'])(action.status);
      if (action.sendSignal) {
        signal('studentStatus', { studentId: action.studentId, status });
      }
      return R.assocPath(['students', action.studentId, 'status'], R.merge(currentStatus, status), state);
    default:
      return state;
  }
}

export default classroom;
