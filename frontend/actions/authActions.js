import ajax from '../helpers/ajax';
import initialState from '../reducers/initialState';

const AUTH_ACTIONS = {
  AUTH_CONTROLLED: 'AUTH_CONTROLLED',
};

const actionAuthFetched = (auth) => {
  return {
    type: AUTH_ACTIONS.AUTH_CONTROLLED,
    auth,
  };
};

const fetchAuth = () => {
  return (dispatch) => {
    return (ajax.getJson({
      url: '/api/v1/authenticate',
      successCallback: (json) => {
        dispatch(actionAuthFetched(json.data.attributes));
      },
      errorCallback: () => {
        dispatch(actionAuthFetched(initialState));
      },
    }));
  };
};

export { AUTH_ACTIONS, actionAuthFetched, fetchAuth };
