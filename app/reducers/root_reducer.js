import {combineReducers} from 'redux';  
import disks from './DisksReducer';

const root_reducer = combineReducers({  
  // short hand property names
  // cats
  disks
});

export default root_reducer;
