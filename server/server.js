import compression from 'compression';
import express from 'express';
import morgan from 'morgan';
import path from 'path';

import {
  webpackMiddleware,
  webpackHotMiddleware
} from './middleware/webpackMiddleware';

import reactMiddleware from './middleware/reactMiddleware';

const DEBUG = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;
const server = express();

if (DEBUG) {
  server.use(webpackMiddleware);
  server.use(webpackHotMiddleware);
}

server.use(compression());
server.use(express.static(path.resolve(__dirname, '../build')));
server.use(morgan(DEBUG ? 'dev' : 'combined'));
server.use(reactMiddleware);

server.listen(PORT, () =>
  console.info(`Server running in ${server.get('env')} on port ${PORT}`)
);
