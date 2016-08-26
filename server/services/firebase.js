const firebase = require('firebase');
const config = require('../config/credentials');
const serviceAccountCredentials = require('../config/firebaseCredentials.json');

// Initialize the app with a service account, granting admin privileges
firebase.initializeApp({
  databaseURL: config.firebase.databaseURL,
  serviceAccount: serviceAccountCredentials
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
const db = firebase.database();

module.exports = db;
