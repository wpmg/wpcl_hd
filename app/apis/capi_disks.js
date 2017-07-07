/* APIS */

const GetDisk = (disk) => {
  return fetch('/api/v1/disk/' + disk, {credentials: 'include'}).then((response) => {
    return response.json();
  }).catch((error) => {
    return error;
  });
};

/* ACTIONS */

const LoadDisksSuccess = function(disks) {
  return {
    type: 'LOAD_DISKS_SUCCESS',
    disks
  };
};

const ActionLoadDisks = function() {
  return function(dispatch) {
    return GetDisk('all').then((disks) => {
      dispatch(LoadDisksSuccess(disks.disks));
    }).catch(error => {
      throw (error);
    });
  };
};

export {GetDisk, ActionLoadDisks, LoadDisksSuccess};
