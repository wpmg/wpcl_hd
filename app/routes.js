import React from 'react';

import {Route, IndexRoute} from 'react-router';

import AppDefault from './components/AppDefault';
import DisksPage from './components/dashboard/disks/DisksPage';

export default (
  <Route path="/dashboard" component={AppDefault}>
    <IndexRoute component={DisksPage} />
  </Route>
);
