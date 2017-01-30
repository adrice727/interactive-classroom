import R from 'ramda';
// import otCore from 'opentok-accelerator-core';

// const cameraProperties = {
//   insertMode: 'append',
//   width: '100%',
//   height: '100%',
//   showControls: false,
//   fitMode: 'cover',
//   style: {
//     buttonDisplayMode: 'on',
//     nameDisplayMode: 'on',
//   },
// };

// /**
//  * Send a signal using the OpenTok signaling API
//  * @param {String} type
//  * @param {*} data
//  * @param {Object} to - An OpenTok connection object
//  * @returns {Promise} <resolve: empty, reject: {Error}>
//  */
// const signal = (type, data, to) =>
//   new Promise((resolve, reject) => {
//     otCore.signal(type, data)
//     .then(resolve)
//     .catch(reject);
//   });

/**
 * Parse connection data from a stream
 * @param {Object} stream - An OpenTok stream
 * @returns {*}
 */
const streamData = stream => JSON.parse(R.pathOr(null, ['connection', 'data'], stream));

module.exports = {
  streamData,
}
