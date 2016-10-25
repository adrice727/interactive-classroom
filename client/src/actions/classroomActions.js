export const setClassroom = classroom => ({
  type: 'SET_ACTIVE_CLASSROOM',
  classroom
});

export const isConnected = connected => ({
  type: 'SET_CLASSROOM_CONNECTED',
  connected
});

export const instructorJoined = instructor => ({
  type: 'INSTRUCTOR_JOINED_CLASSROOM',
  instructor
});

export const studentJoined = student => ({
  type: 'STUDENT_JOINED_CLASSROOM',
  student
});

export const updateStudentStatus = (studentId, status, sendSignal) => ({
  type: 'UPDATE_STUDENT_STATUS',
  studentId,
  status,
  sendSignal
});

// export const studentHasQuestion = (studentId, sendSignal) => ({
//   type: 'STUDENT_HAS_QUESTION',
//   studentId,
//   sendSignal
// });

// export const studentHasAnswer = (studentId, sendSignal) => ({
//   type: 'STUDENT_HAS_ANSWER',
//   studentId,
//   sendSignal
// });

export const resetClassroom = () => ({
  type: 'RESET_CLASSROOM'
});

export const setSession = session => ({
  type: 'SET_CLASSROOM_SESSION',
  session
});