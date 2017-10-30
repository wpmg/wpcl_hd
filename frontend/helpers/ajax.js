const ajax = (() => {
  const checkDefined = (v) => {
    return !(typeof v === 'undefined');
  };

  const undefinedFallback = (v, d) => {
    return checkDefined(v) === false ? d : v;
  };

  const base = ({ url, options, successCallback, errorCallback }) => {
    const o = undefinedFallback(options, {});
    const e = undefinedFallback(errorCallback, (error) => { console.log(error); });
    const fetchOptions = {
      method: undefinedFallback(o.method, 'GET'),
      credentials: undefinedFallback(o.credentials, 'omit'),
      headers: undefinedFallback(o.headers, {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
      body: undefinedFallback(o.body, null),
    };

    return fetch(url, fetchOptions)
      .then((response) => { return response.json(); })
      .then(successCallback)
      .catch(e);
  };

  const getJson = ({ url, options, successCallback, errorCallback }) => {
    const o = undefinedFallback(options, {});
    const getOptions = {
      method: 'GET',
      credentials: undefinedFallback(o.credentials, 'same-origin'),
      headers: undefinedFallback(o.headers, { Accept: 'application/json' }),
      body: null,
    };

    return base({
      url,
      options: getOptions,
      successCallback,
      errorCallback,
    });
  };

  const putJson = ({ url, body, options, successCallback, errorCallback }) => {
    const o = undefinedFallback(options, {});
    const getOptions = {
      method: 'PUT',
      credentials: undefinedFallback(o.credentials, 'same-origin'),
      headers: undefinedFallback(o.headers, {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(body),
    };

    return base({
      url,
      options: getOptions,
      successCallback,
      errorCallback,
    });
  };

  return {
    base,
    getJson,
    putJson,
  };
})();

export default ajax;
