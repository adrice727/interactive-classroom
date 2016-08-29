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

/**
 * Routes
 */
server.post('/user', (req, res) => {
  User.validate(R.path(['body', 'user'], req))
    .then(user => res.send(user))
    .catch(error => res.status(400).send(error));
});

server.listen(port, () =>
  console.info(`Server running in ${server.get('env')} on port ${port}`)
);
