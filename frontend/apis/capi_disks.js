const getDisk = (diskId) => {
  return (
    fetch(`/api/v1/disk/${diskId}`, { credentials: 'include' })
      .then((response) => {
        return response.json();
      }).catch((error) => {
        return error;
      })
  );
};

const getDiskAttributes = (diskId, attrId) => {
  return (
    fetch(`/api/v1/disk/${diskId}/attributes/${attrId}`, { credentials: 'include' })
      .then((response) => {
        return response.json();
      }).catch((error) => {
        return error;
      })
  );
};

export { getDisk, getDiskAttributes };
export default getDisk;
