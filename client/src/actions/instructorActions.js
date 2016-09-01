export const setInstructor = instructor => ({
  type: 'SET_INSTRUCTOR',
  instructor
});

export const setInstructorClassrooms = classrooms => ({
  type: 'SET_INSTRUCTOR_CLASSROOMS',
  classrooms
});

export const addInstructorClassroom = classroom => ({
  type: 'ADD_INSTRUCTOR_CLASSROOM',
  classroom
});

export const removeInstructorClassroom = classroomId => ({
  type: 'REMOVE_INSTRUCTOR_CLASSROOM',
  classroomId
});