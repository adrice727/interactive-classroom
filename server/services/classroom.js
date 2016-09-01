/** Dependencies */
const Promise = require('bluebird');
const db = require('./firebase');
const R = require('ramda');
const User = require('./user');
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
 * @return {Promise} <resolve: undefined, reject: Error> - firebase `set` returns an empty promise
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
          .then(() => resolve(classroomData))
          .catch(error => reject(error));
      }).catch(error => reject(error));
  });

/**
 * Fetch an instructors classrooms from the db
 * @param {String} instructorId
 * @param {Object} classroom
 * @param {String} classroom.title
 * @param {String} classroom.description
 * @return {Promise} <resolve: undefined, reject: Error> - firebase `set` returns an empty promise
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
  getInstructorClassrooms
};
