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

export const instructorLeft = instructorId => ({
  type: 'INSTRUCTOR_LEFT_CLASSROOM',
  instructorId
});

export const takeQuestion = studentId => ({
  type: 'INSTRUCTOR_TAKES_QUESTION',
  studentId,
});

export const takeAnswer = studentId => ({
  type: 'INSTRUCTOR_TAKES_ANSWER',
  studentId,
});

export const studentJoined = student => ({
  type: 'STUDENT_JOINED_CLASSROOM',
  student
});

export const studentLeft = studentId => ({
  type: 'STUDENT_LEFT_CLASSROOM',
  studentId
});

export const updateStudentStatus = (studentId, status, sendSignal) => ({
  type: 'UPDATE_STUDENT_STATUS',
  studentId,
  status,
  sendSignal
});

export const resetClassroom = () => ({
  type: 'RESET_CLASSROOM'
});
