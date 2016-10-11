export const setClassroom = classroom => ({
  type: 'SET_ACTIVE_CLASSROOM',
  classroom
});

export const instructorJoined = instructor => ({
  type: 'INSTRUCTOR_JOINED_CLASSROOM',
  instructor
});

export const studentJoined = student => ({
  type: 'STUDENT_JOINED_CLASSROOM',
  student
});

export const resetClassroom = () => ({
  type: 'RESET_CLASSROOM'
});

export const setSession = session => ({
  type: 'SET_CLASSROOM_SESSION',
  session
});