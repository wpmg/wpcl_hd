import merge from 'lodash/merge';

import initialState from './initialState';
import { DISK_ACTIONS } from '../actions/diskActions';

const disksReducer = (state = initialState.disks, action) => {
  switch (action.type) {
    case DISK_ACTIONS.ALL_DISKS_FETCHED:
      return action.disks;

    case DISK_ACTIONS.DISK_LATEST_ATTRIBUTES_FETCHED: {
      const a = merge({}, state, {
        data: {
          [action.diskId]: {
            attr_section: action.attributes,
          },
        },
      });
      console.log(a);
      return a;
    }
    default:
      return state;
  }
};

export default disksReducer;