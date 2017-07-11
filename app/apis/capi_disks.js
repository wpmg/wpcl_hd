/* APIS */

const GetDisk = (disk) => {
  return (
    fetch(`/api/v1/disk/${disk}`, { credentials: 'include' })
      .then((response) => {
        return response.json();
      }).catch((error) => {
        return error;
      })
  );
};

/* ACTIONS */

const LoadDisksSuccess = (disks) => {
  return {
    type: 'LOAD_DISKS_SUCCESS',
    disks,
  };
};

const ActionLoadDisks = () => {
  return (dispatch) => {
    return (
      fetch('/api/v1/disk/all', { credentials: 'include' })
        .then((response) => {
          return response.json();
        })
        .catch((error) => {
          return error;
        })
        .then((disks) => {
          dispatch(LoadDisksSuccess(disks));
        })
        .catch((error) => {
          throw (error);
        })
    );
  };
};

const ActionLoadDisksOrg = () => {
  return (dispatch) => {
    return (
      GetDisk('all')
        .then((disks) => {
          dispatch(LoadDisksSuccess(disks));
        }).catch((error) => {
          throw (error);
        })
    );
  };
};

export { GetDisk, ActionLoadDisks, LoadDisksSuccess };
