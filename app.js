import express from 'express';
import React from 'react';
import Router from 'react-router';
import ReactDOMServer from 'react-dom/server';

const app = express();

app.set('views', './components');

const engineOptions = { transformViews: false };
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine(engineOptions));

import routes from './shared/routes/routes';

app.get('/*', (req, res) => {
  Router.run(routes, req.url, Handler => {
    const content = ReactDOMServer.renderToString(<Handler />);
    res.render('index', { content });
  });
});

const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
