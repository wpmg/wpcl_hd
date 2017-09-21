import { GetAuth } from '../apis/capi_auth';

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
    return (
      GetAuth()
        .then((auth) => {
          dispatch(actionAuthFetched(auth));
        }).catch((error) => {
          throw (error);
        })
    );
  };
};

export { AUTH_ACTIONS, actionAuthFetched, fetchAuth };
