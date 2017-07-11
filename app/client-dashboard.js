import React from 'react';
import { Router } from 'react-router';
import { createHistory } from 'history';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root_reducer';

import routes from './routes';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

render(
  (
    <Provider store={store}>
      <Router history={createHistory()}>
        {routes}
      </Router>
    </Provider>
  ),
  document.querySelectorAll('[data-ui-role="content_react"]')[0]
);
