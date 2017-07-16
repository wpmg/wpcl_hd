import merge from 'lodash/merge';

import initialState from './initialState';
import { DISK_ACTIONS } from '../actions/diskActions';

const disksReducer = (state = initialState.disks, action) => {
  switch (action.type) {
    case DISK_ACTIONS.ALL_DISKS_FETCHED:
      return action.disks;

    case DISK_ACTIONS.DISK_LATEST_ATTRIBUTES_FETCHED:
      return merge({}, state, {
        data: {
          [action.diskId]: action.attributes,
        },
      });

    default:
      return state;
  }
};

export default disksReducer;
