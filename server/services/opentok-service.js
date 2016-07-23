/* Config */
const { apiKey, apiSecret } = require('../../config');

import OpenTok from 'opentok';
import Promise from 'bluebird';
import R from 'ramda';

const OT = Promise.promisifyAll(new OpenTok(apiKey, apiSecret));

/** Private */

const defaultSessionOptions = { mediaMode: 'routed' };

/**
 * Returns options for token creation based on user type
 * @param {String} userType Host, guest, or viewer
 */
const tokenOptions = userType => {
  const role = {
    instructor: 'moderator',
    student: 'publisher',
    auditor: 'subscriber',
  }[userType];

  return { role };
};

/** Exports */

/**
 * Create an OpenTok token
 * @param {String} sessionId
 * @param {String} userType instructor, student, auditor
 * @returns {String}
 */
export const createToken = (sessionId, userType) =>
  OT.generateToken(sessionId, tokenOptions(userType));

/**
 * Create an OpenTok session
 * @param {Object} [options]
 * @returns {Promise} <Resolve => {Object}, Reject => {Error}>
 */
export const createSession = options =>
  new Promise((resolve, reject) => {
    OT.createSession(R.defaultTo(defaultSessionOptions)(options), (err, session) => {
      if (err) { reject(err); }
      resolve(session);
    });
  });



