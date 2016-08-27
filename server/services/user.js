const Promise = require('bluebird');
const db = require('./firebase');
const R = require('./ramda');


const validUser = user => {
  const props = ['id', 'name', 'email'];
  return R.length(R.keys(R.pick(props, user))) >= 3;
};

/**
 * Creates a user in the database
 * @param {Object} user
 * @param {String} user.id
 * @param {String} user.name
 * @param {String} user.email
 * @return {Promise} <resolve: undefined, reject: Error> - firebase `set` returns an empty promise
 */
const create = user =>
  new Promise((resolve, reject) => {
    db.ref(`users/${user.id}`).set(user)
      .then(resolve())
      .catch(error => reject(error));
  });

/**
 * Checks whether or not a user exists in the database
 * @param {Object} user
 * @returns {Promise} <Resolve: Boolean, Reject: Error>
 */
const exists = user =>
  new Promise((resolve, reject) => {
    console.log(22222, user);
    db.ref(`users/${R.get('id', user)}`).once('value').then(snapshot => {
      const record = snapshot.val();
      if (record) {
        resolve(record);
      } else {
        create(user)
          .then(resolve)
          .catch(reject);
      }
    });
  });

/**
 * Validate a user
 * @param {Object} user
 * @param {String} user.id
 * @param {String} user.name
 * @param {String} user.email
 * @param {String} [user.photoURL]
 * @returns {Promise} <Resolve: {Object}, reject: {Error}>
 */
const validate = user =>
  new Promise((resolve, reject) => {
    if (!validUser(user)) {
      reject({ error: 'An id, name, and email are required to log in a user.' });
    }
    exists(user.id)
      .then(resolve)
      .catch(reject);
  });


// /**
//  * Checks for a user in the database.  If they don't exist, they are created.
//  * @param {Object} user
//  * @param {String} user.id
//  * @param {String} user.name
//  * @param {String} user.email
//  * @return {Promise} <resolve: User object, reject: Error>
//  */
// const retrieve = user =>
//   new Promise((resolve, reject) => {
//     if (!user.id) {
//       reject('A user id is required');
//     }
//     db.ref(`users/${user.id}`).once('value').then(snapshot => {
//       const record = snapshot.val();
//       if (!record) {
//         if (isValid(user)) {
//           create(user)
//             .then(resolve(user))
//             .catch(error => reject(error));
//         } else {
//           reject('An id, name, and email are required to create a new user');
//         }
//       } else {
//         resolve(record);
//       }
//     });
//   });

module.exports = {
  validate
};
