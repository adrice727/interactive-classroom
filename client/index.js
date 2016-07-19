import React from 'react';
import Router from 'react-router';
import routes from '../shared/routes/routes';

Router.run(routes, Router.HistoryLocation, (Handler, state) => {
  React.render(<Handler />, document.getElementById('app'));
});
