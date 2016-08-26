const cors = require('cors');

const whitelist = [
  'http://localhost:3000'
];

const options = {
  origin(origin, callback) {
  	const isWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  }
};

module.exports = () => cors(options);