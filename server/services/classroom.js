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

/**
 * Fetch available classrooms from the db. If an instructor id is provided,
 * only that instructors classes will be returned.
 * @param {String} [instructorId]
 * @returns {Promise} <resolve: {Object}, reject: {Error}>
 */
  const getClassrooms = instructorId => {
    if (instructorId) { return getInstructorClassrooms(instructorId); }
    return new Promise((resolve, reject) => {
      db.ref('/classrooms').once('value')
      .then(snapshot => {
        const record = snapshot.val();
        resolve({ classrooms: R.defaultTo({})(record) });
      })
      .catch(error => reject(error));
    });
  };

/**
 * Fetch data for an individual classroom from the db.
 * @param {String} classroomId
 * @returns {Promise} <resolve: {Object}, reject: {Error}>
 */
  const getClassroom = classroomId =>
    new Promise((resolve, reject) => {
      db.ref(`/classrooms/${classroomId}`).once('value')
      .then(snapshot => {
        const record = snapshot.val();
        if (record) {
          resolve(record);
        } else {
          reject(`No data found for classroom ${classroomId}`);
        }
      })
    })

module.exports = {
  create,
  remove,
  getClassroom,
  getClassrooms
};
