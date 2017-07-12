const GetAuth = () => {
  return (
    fetch('/api/v1/auth', { credentials: 'include' })
      .then((response) => {
        return response.json();
      }).catch((error) => {
        return error;
      })
  );
};

export { GetAuth };
export default GetAuth;
