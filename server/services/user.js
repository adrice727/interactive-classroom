/** Dependencies */
const Promise = require('bluebird');
const db = require('./firebase');
const R = require('ramda');

/** Helper functions */
const getId = user => R.path(['id'], user);

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
    const id = getId(user);
    if (!id) {
      reject('An id is required to create a user');
    }
    db.ref(`users/${user.id}`).set(R.omit(['role'], user))
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
    db.ref(`users/${getId(user)}`).once('value').then(snapshot => {
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
    exists(user)
      .then(resolve)
      .catch(reject);
  });

module.exports = {
  validate
};
