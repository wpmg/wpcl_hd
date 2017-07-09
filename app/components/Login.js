import React from 'react';
import 'bootstrap';

export default class App extends React.Component {
  render() {
    return (
      <form className="form-signin" method="post" action="/login">
        <h2 className="form-signin-heading">Sign in</h2>
        <div className="form-group">
          <label htmlFor="username" className="sr-only">E-mail address</label>
          <input type="email" name="username" className="form-control" placeholder="E-mail address"
                 required autoFocus />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="sr-only">Password</label>
          <input type="password" name="password" className="form-control" placeholder="Password"
                 required />
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-block" type="submit">Sign in</button>
        </div>
      </form>
    );
  }
}
