/* Config */
const config = require('../config/credentials');
const apiKey = config.opentok.key;
const apiSecret = config.opentok.secret;

const OpenTok = require('opentok');
const Promise = require('bluebird');
const R = require('ramda');
const OT = Promise.promisifyAll(new OpenTok(apiKey, apiSecret));

/** Private */

const defaultSessionOptions = { mediaMode: 'routed' };

/**
 * Returns options for token creation based on user type
 * @param {String} userType Host, guest, or viewer
 */
const tokenOptions = user => {
  const role = {
    instructor: 'moderator',
    student: 'publisher',
    auditor: 'subscriber',
  }[user.role];

  const data = JSON.stringify({
    id: user.id,
    role: user.role,
    name: user.name
  });

  return { role, data };
};

/** Exports */

/**
 * Create an OpenTok token
 * @param {String} sessionId
 * @param {String} userType instructor, student, auditor
 * @returns {Object} Credentials, including apiKey, sessionId, and token
 */
const createToken = (sessionId, user) => {
  const token = OT.generateToken(sessionId, tokenOptions(user));
  return { apiKey, sessionId, token };
};


/**
 * Create an OpenTok session
 * @param {Object} [options]
 * @returns {Promise} <Resolve => {Object}, Reject => {Error}>
 */
const createSession = options =>
  new Promise((resolve, reject) => {
    OT.createSession(R.defaultTo(defaultSessionOptions)(options), (err, session) => {
      if (err) { reject(err); }
      resolve(session);
    });
  });

module.exports = {
  createSession,
  createToken
};
