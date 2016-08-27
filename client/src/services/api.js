const parentWindow = window.parent;
const origin = parentWindow.location.hostname;
const backendUrl = 'https://opentok-classroom-server.herokuapp.com';
const api = origin === 'localhost' ? 'http://localhost:3030' : backendUrl;
export default api;