export const setInstructor = instructor => ({
  type: 'SET_INSTRUCTOR',
  instructor
});

export const setClassrooms = classrooms => ({
  type: 'SET_INSTRUCTOR_CLASSROOMS',
  classrooms
});

export const addClassroom = classroom => ({
  type: 'ADD_INSTRUCTOR_CLASSROOM',
  classroom
});

export const removeClassroom = classroomId => ({
  type: 'REMOVE_INSTRUCTOR_CLASSROOM',
  classroomId
});