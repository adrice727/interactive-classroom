import R from 'ramda';
import otCore from 'opentok-accelerator-core';

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

const coreOptions = (user) => {
  const streamContainers = (pubSub, type, data) => {
    const id = pubSub === 'publisher' ? user.id : data.id;
    if (type === 'camera') {
      return `#video-${id}`
    }
  }
  return {
    controlsContainer: '#videoControls',
    streamContainers,
    communication: {
      autoSubscribe: false
    },
    packages: ['textChat'],
    textChat: {
      name: user.name,
      waitingMessage: 'Waiting for others to join the classroom',
      container: '#chat',
      alwaysOpen: true,
    }
  };
};

/**
 * Send a signal using the OpenTok signaling API
 * @param {String} type
 * @param {*} data
 * @param {Object} to - An OpenTok connection object
 * @returns {Promise} <resolve: empty, reject: {Error}>
 */
const signal = (type, data, to) =>
  new Promise((resolve, reject) => {
    otCore.signal(type, data)
    .then(resolve)
    .catch(reject);
  });

/**
 * Parse connection data from a stream
 * @param {Object} stream - An OpenTok stream
 * @returns {*}
 */
const streamData = stream => JSON.parse(R.pathOr(null, ['connection', 'data'], stream));

module.exports = {
  coreOptions,
  otCore,
  signal,
  streamData,
}
