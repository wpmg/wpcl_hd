const ajax = (() => {
  const checkDefined = (v) => {
    return !(typeof v === 'undefined');
  };

  const undefinedFallback = (v, d) => {
    return checkDefined(v) === false ? d : v;
  };

  const jsonApiMediaType = 'application/vnd.api+json';

  const parseJson = (response) => {
    return response.json().then((json) => {
      return {
        json,
        meta: {
          response_status: response.status,
          response_text: response.statusText,
          response_ok: response.ok,
          network_error: null,
          network_ok: true,
        },
      };
    });
  };

  const base = ({ url, options, successCallback, errorCallback }) => {
    const o = undefinedFallback(options, {});
    const e = undefinedFallback(errorCallback, (error, meta) => { console.log(error, meta); });
    const fetchOptions = {
      method: undefinedFallback(o.method, 'GET'),
      credentials: undefinedFallback(o.credentials, 'omit'),
      headers: undefinedFallback(o.headers, {
        Accept: jsonApiMediaType,
      }),
      body: undefinedFallback(o.body, null),
    };

    return fetch(url, fetchOptions)
      .then(parseJson)
      .then(({ json, meta }) => {
        if (!meta.response_ok) {
          e(json, meta);
        }

        successCallback(json, meta);
      })
      .catch((error) => {
        e(
          null,
          {
            response_status: null,
            response_text: null,
            response_ok: false,
            network_error: error,
            network_ok: false,
          },
        );
      });
  };

  const getJson = ({ url, options, successCallback, errorCallback }) => {
    const o = undefinedFallback(options, {});
    const getOptions = {
      method: 'GET',
      credentials: undefinedFallback(o.credentials, 'same-origin'),
      headers: undefinedFallback(o.headers, { Accept: jsonApiMediaType }),
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
        Accept: jsonApiMediaType,
        'Content-Type': jsonApiMediaType,
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
