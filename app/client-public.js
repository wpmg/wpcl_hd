import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import Login from './components/Login';

render((
  <Router history={createHistory()}>
    <Route path="*" component={Login} />
  </Router>
), document.querySelectorAll('[data-ui-role="content"]')[0]);
