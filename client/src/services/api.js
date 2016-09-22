/** Dependencies */
import R from 'ramda';

/** Constants */
const parentWindow = window.parent;
const origin = parentWindow.location.hostname;
const backendUrl = 'https://opentok-classroom-server.herokuapp.com';
const url = origin === 'localhost' ? 'http://localhost:3030' : backendUrl;

/** Helper methods */

// Parse response based on type
const parseResponse = response => {
  const contentType = response.headers.get('content-type').split(';')[0];
  if (contentType === 'application/json') {
    return response.json();
  } else if ( contentType === 'text/html') {
    return response.text();
  }
};

const request = (method, route, body) =>
  new Request(`${url}/${route}`, {
      method: R.toUpper(method),
      mode: 'cors',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: body ? JSON.stringify(body) : null
    });

/** Exports */
const get = route =>
  new Promise((resolve, reject) => {
    fetch(request('get', route))
    .then(response => parseResponse(response))
    .then(resolve)
    .catch(reject)
  });

const post = (route, body) =>
  new Promise((resolve, reject) => {
  fetch(request('post', route, body))
    .then(response => parseResponse(response))
    .then(resolve)
    .catch(reject)
  });


const del = (route, body) =>
  new Promise((resolve, reject) => {
  fetch(request('delete', route, body))
    .then(response => parseResponse(response))
    .then(resolve)
    .catch(reject)
  });

module.exports = {
  get,
  post,
  del
}