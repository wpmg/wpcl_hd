import initialState from './initial_state';

const DisksReducer = (state = initialState.disks, action) => {
  switch (action.type) {
    case 'LOAD_DISKS_SUCCESS':
      return action.disks;

    default:
      return state;
  }
};

export default DisksReducer;
