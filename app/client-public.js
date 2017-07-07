// import React from 'react';
import {Router, Route} from 'react-router';
import {createHistory} from 'history';
import {render} from 'react-dom';

import Login from './components/Login';

render((
    <Router history={createHistory()}>
        <Route path="*" component={Login}/>
    </Router>
), document.querySelectorAll('[data-ui-role="content"]')[0]);
