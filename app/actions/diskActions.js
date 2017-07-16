import { getDisk, getDiskAttributes } from '../apis/capi_disks';

const DISK_ACTIONS = {
  ALL_DISKS_FETCHED: 'ALL_DISKS_FETCHED',
  DISK_LATEST_ATTRIBUTES_FETCHED: 'DISK_LATEST_ATTRIBUTES_FETCHED',
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

const actionAttributesLatestFetched = (diskId, attributes) => {
  return {
    type: DISK_ACTIONS.DISK_LATEST_ATTRIBUTES_FETCHED,
    diskId,
    attributes,
  };
};

const fetchAllDisks = () => {
  return (dispatch) => {
    return (
      getDisk('all')
        .then((disks) => {
          dispatch(actionDisksFetched(disks));
        }).catch((error) => {
          throw (error);
        })
    );
  };
};

const fetchLatestAttributes = (diskId) => {
  return (dispatch) => {
    return (
      getDiskAttributes(diskId, 'latest')
        .then((attributes) => {
          dispatch(actionAttributesLatestFetched(diskId, attributes));
        }).catch((error) => {
          throw (error);
        })
    );
  };
};

export {
  DISK_ACTIONS,
  actionDisksFetched,
  fetchAllDisks,
  fetchLatestAttributes,
};
