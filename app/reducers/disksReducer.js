import initialState from './initialState';
import { DISK_ACTIONS } from '../actions/diskActions';

const disksReducer = (state = initialState.disks, action) => {
  switch (action.type) {
    case DISK_ACTIONS.ALL_DISKS_FETCHED:
      return action.disks;

    default:
      return state;
  }
};

export default disksReducer;