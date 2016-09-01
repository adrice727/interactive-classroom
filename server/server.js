const express = require('express');
const port = process.env.PORT || 3030;
const server = express();
const R = require('ramda');
/**
 * Middleware
 */
const cors = require('./middleware/cors');
const bodyParser = require('body-parser');

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());

/**
 * Services
 */
const User = require('./services/user');
const Classroom = require('./services/classroom');

/**
 * Routes
 */
server.post('/user', (req, res) => {
  User.validate(R.path(['body', 'user'], req))
    .then(user => res.send(user))
    .catch(error => res.status(400).send(error));
});

server.get('/classrooms/:instructorId', (req, res) => {
  Classroom.getInstructorClassrooms(R.path(['params', 'instructorId'], req))
    .then(classroomData => res.send(classroomData))
    .catch(error => res.status(400).send(error));
});

server.post('/classroom', (req, res) => {
  const classroom = R.path(['body', 'classroom'], req);
  Classroom.create(classroom)
    .then(classroomData => res.send(classroomData))
    .catch(error => res.status(400).send(error));
});

server.delete('/classroom/:classroomId', (req, res) => {
  const classroomId = R.path(['params', 'classroomId'], req);
  Classroom.remove(classroomId)
    .then(classroomData => res.send(classroomData))
    .catch(error => res.status(400).send(error));
});


server.listen(port, () =>
  console.info(`Server running in ${server.get('env')} on port ${port}`)
);
