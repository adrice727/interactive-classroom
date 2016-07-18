import { Route } from 'react-router';
import React from 'react';
import App from './views/App/App';
import ProjectSearch from './views/ProjectSearch/ProjectSearch';
import Project from './views/Project/Project';

export default (
  <Route handler={ App }>
    <Route name='projectSearch' path="search" handler={ProjectSearch}/>
    <Route name='project' path="/project/:projectId" handler={Project}/>
  </Route>
);