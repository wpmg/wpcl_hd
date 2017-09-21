import { combineReducers } from 'redux';

import disks from './disksReducer';
import auth from './authReducer';

const rootReducer = combineReducers({
  // short hand property names
  auth,
  disks,
});

export default rootReducer;
