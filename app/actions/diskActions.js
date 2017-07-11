import { GetDisk } from '../apis/capi_disks';

const DISK_ACTIONS = {
  ALL_DISKS_FETCHED: 'ALL_DISKS_FETCHED',
};

const actionDisksFetched = (disks) => {
  return {
    type: DISK_ACTIONS.ALL_DISKS_FETCHED,
    disks: {
      data: disks,
      latestFetch: (new Date()).getTime(),
    },
  };
};

const fetchAllDisks = () => {
  return (dispatch) => {
    return (
      GetDisk('all')
        .then((disks) => {
          dispatch(actionDisksFetched(disks));
        }).catch((error) => {
          throw (error);
        })
    );
  };
};

export { DISK_ACTIONS, actionDisksFetched, fetchAllDisks };
