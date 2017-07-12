import initialState from './initialState';
import { AUTH_ACTIONS } from '../actions/authActions';

const authReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.AUTH_CONTROLLED:
      return action.auth;

    default:
      return state;
  }
};

export default authReducer;
