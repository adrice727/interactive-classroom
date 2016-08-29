/** Dependencies */
import R from 'ramda';

/** Constants */
const parentWindow = window.parent;
const origin = parentWindow.location.hostname;
const backendUrl = 'https://opentok-classroom-server.herokuapp.com';
const url = origin === 'localhost' ? 'http://localhost:3030' : backendUrl;

/** Helper methods */
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
    .then(response => response.json())
    .then(resolve)
    .catch(reject)
  });

const post = (route, body) =>
  new Promise((resolve, reject) => {
    console.log(1111, route, body);
    fetch(request('post', route, body))
    .then(response => response.json())
    .then(resolve)
    .catch(reject)
  });

module.exports = {
  get,
  post
}