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



export { GetDisk };
