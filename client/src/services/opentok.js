import R from 'ramda';

// The current session
let _session = null;

// Set the current session
const setSession = session => {
  _session = session;
};

/**
 * Send a signal using the OpenTok signaling API
 */
const signal = (type, signalData, to) =>
  new Promise((resolve, reject) => {
    if (!_session) {
      reject('No current OpenTok session');
    }
    const data = JSON.stringify(signalData);
    const props = to ? { to, type, data } : { type, data };
    _session.signal(props, e => e ? reject(e) : resolve());
  });

const cameraProperties = {
  insertMode: 'append',
  width: '100%',
  height: '100%',
  showControls: false,
  fitMode: 'contain',
  style: {
    buttonDisplayMode: 'on',
    nameDisplayMode: 'on',
  },
};

module.exports = {
  cameraProperties,
  setSession,
  signal,
}
