import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import routes from './routes'
import configureStore from './configureStore';
import './index.css';

render((
  <Provider store={configureStore()}>
    { routes }
  </Provider>
   ), document.getElementById('root'));

