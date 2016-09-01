/** Dependencies */
const Promise = require('bluebird');
const db = require('./firebase');
const R = require('ramda');
const Opentok = require('./opentok');

// Ensures a classroom has a name, description, and instructorId
const validClassroom = classroom => { // eslint-disable-line arrow-body-style
  return R.length(R.keys(R.pick(['name', 'description', 'instructorId'], classroom))) === 3;
};


/**
 * Creates a classroom in the database
 * @param {Object} classroom
 * @param {String} classroom.title
 * @param {String} classroom.description
 * @param {String} classroom.instructor
 * @returns {Promise} <resolve: {Object}, reject: {Error}>
 */
const create = (classroom) =>
  new Promise((resolve, reject) => {
    if (!validClassroom(classroom)) {
      reject('A name, description, and instructorId are required to create a classroom');
    }
    const classroomId = db.ref('classrooms').push().key;
    Opentok.createSession()
      .then(session => {
        const classroomData = R.merge(classroom, { id: classroomId, sessionId: session.sessionId });
        db.ref(`classrooms/${classroomId}`).set(classroomData)
          .then(() => resolve({ [classroomId]: classroomData }))
          .catch(error => reject(error));
      }).catch(error => reject(error));
  });

/**
 * Removes a classroom from the database
 * @param {String} classroomId
 * @returns {Promise} <resolve: {String}, reject: {Error}>
 */
const remove = (classroomId) =>
  new Promise((resolve, reject) => {
    if (!classroomId) {
      reject('A classroomId is required to remove a classroom');
    }
    db.ref(`classrooms/${classroomId}`).remove()
    .then(() => resolve({ result: `Classroom ${classroomId} successfully removed` }))
    .catch(reject);
  });

/**
 * Fetch an instructors classrooms from the db
 * @param {String} instructorId
 * @param {Object} classroom
 * @param {String} classroom.title
 * @param {String} classroom.description
 * @returns {Promise} <resolve: {Object}, reject: {Error}>
 */
const getInstructorClassrooms = instructorId =>
  new Promise((resolve, reject) => {
    if (!instructorId) {
      reject('An instructor id is required to retrieve an instructor\'s classrooms');
    }
    db.ref('/classrooms').orderByChild('instructorId').equalTo(instructorId)
      .once('value')
      .then(snapshot => {
        const record = snapshot.val();
        resolve({ classrooms: R.defaultTo({})(record) });
      })
      .catch(error => reject(error));
  });



module.exports = {
  create,
  remove,
  getInstructorClassrooms
};
