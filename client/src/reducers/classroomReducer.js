import R from 'ramda';
import { setSession, signal } from '../services/opentok';

const classroom = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_CLASSROOM':
      return R.merge(state, action.classroom);
    case 'SET_CLASSROOM_SESSION':
      setSession(action.session);
      return R.assoc('session', action.session, state);
    case 'SET_CLASSROOM_CONNECTED':
      return R.assoc('connected', action.connected, state);
    case 'INSTRUCTOR_JOINED_CLASSROOM':
      return R.assoc('instructor', action.instructor, state);
    case 'INSTRUCTOR_LEFT_CLASSROOM':
      return R.assoc('instructor', null, state);
    case 'STUDENT_JOINED_CLASSROOM':
      const initialStudentState = { status: { question: false, answer: false } };
      return R.assocPath(['students', action.student.id], R.merge(action.student, initialStudentState), state);
    case 'STUDENT_LEFT_CLASSROOM':
      const currentStudents = state.students;
      console.log('action on student left', action);
      return R.assoc('students', R.omit([action.studentId], currentStudents), state);
    case 'UPDATE_STUDENT_STATUS':
      const currentStatus = R.path(['students', action.studentId, 'status'], state);
      const status = R.pick(['question', 'answer'])(action.status);
      if (action.sendSignal) {
        signal('studentStatus', { studentId: action.studentId, status });
      }
      return R.assocPath(['students', action.studentId, 'status'], R.merge(currentStatus, status), state);
    case 'RESET_CLASSROOM':
      setSession(null);
      return null;
    default:
      return state;
  }
}

export default classroom;
