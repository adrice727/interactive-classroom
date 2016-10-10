export const setClassroom = classroom => ({
  type: 'SET_ACTIVE_CLASSROOM',
  classroom
});

export const resetClassroom = () => ({
  type: 'RESET_CLASSROOM'
});

export const setClassroomSession = session => ({
  type: 'SET_CLASSROOM_SESSION',
  session
});