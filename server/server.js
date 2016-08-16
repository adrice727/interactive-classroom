const express  = require('express');
const cors = require('./middleware/cors');
const PORT = process.env.PORT || 3030;
const server = express();

server.use(cors());

server.get('/tim', (req, res) => {
  res.send('pike');
});

server.listen(PORT, () =>
  console.info(`Server running in ${server.get('env')} on port ${PORT}`)
);
