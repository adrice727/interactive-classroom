const R = require('ramda');

/**
 * A wrapped version of R.path that accpets keys as a period-delimited.  If no obj is
 * provided, a curried version of R.path will be returned.  Otherwise, the result of
 * calling path with the provided keys and obj will be returned.
 * @param {String} keys - A period-delimited string of object keys
 * @param {Object} [obj] - The object from which to retrive the property
 * @returns {* | Function}
 */
const path = (keys, obj) => obj ? R.path(R.split('.')(keys), obj) : R.path(R.split('.')(keys));

module.exports = {
  path
};
