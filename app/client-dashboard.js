import React from 'react';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root_reducer';

import DashboardLayout from './components/dashboard/DashboardLayout';
// import routes from './routes';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

render(
  (
    <Provider store={store}>
      <Router history={createHistory()}>
        <Route path="/dashboard" component={DashboardLayout} />
      </Router>
    </Provider>
  ),
  document.querySelectorAll('[data-ui-role="content_react"]')[0]
);
