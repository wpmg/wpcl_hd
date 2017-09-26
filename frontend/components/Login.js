/* eslint jsx-a11y/no-autofocus: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { parse as urlParse } from 'url';

const LoginWarning = ({ reason }) => {
  let text;

  switch (reason) {
    case 'logout':
      text = 'You were successfully logged out.';
      break;

    case 'auth':
      text = 'You were logged out due to inactivity.';
      break;

    default:
      return null;
  }

  if (typeof text === 'undefined') {
    return null;
  }

  return (
    <div className="alert alert-warning" role="alert">
      {text}
    </div>
  );
};

LoginWarning.propTypes = {
  reason: PropTypes.string,
};

LoginWarning.defaultProps = {
  reason: '',
};

export default () => {
  const parsedUrl = urlParse(window.location.href, true).query.r;

  return (
    <form className="form-signin" method="post" action="/login">
      <LoginWarning reason={parsedUrl} />
      <h1 className="h1 page-header">Sign in</h1>
      <div className="form-group">
        <label htmlFor="username" className="sr-only">E-mail address</label>
        <input
          type="email"
          name="username"
          className="form-control"
          placeholder="E-mail address"
          required
          autoFocus
        />
      </div>
      <div className="form-group">
        <label htmlFor="password" className="sr-only">Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
          required
        />
      </div>
      <div className="form-group">
        <button className="btn btn-primary btn-block" type="submit">Sign in</button>
      </div>
    </form>
  );
};
