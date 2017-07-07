import initial_state from './initial_state';

const DisksReducer = (state = initial_state.disks, action) => {
  switch (action.type) {
    case 'LOAD_DISKS_SUCCESS':
      return action.disks;

    default: 
      return state;
  }
};

export default DisksReducer;
