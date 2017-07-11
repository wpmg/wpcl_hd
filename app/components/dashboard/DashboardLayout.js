import React from 'react';
import { Route } from 'react-router-dom';
import DashboardRoutes from './DashboardRoutes';
import Menu from './Menu';

class DashboardLayout extends React.Component {
  componentWillMount() {
    //
  }

  render() {
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#navbar"
                aria-expanded="false"
                aria-controls="navbar"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <a className="navbar-brand" href="/dashboard">WPCL HD CC</a>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <p className="navbar-text">Signed in as INSERT NAME</p>
              <ul className="nav navbar-nav visible-xs">
                <Menu auth={3} />
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <Menu auth={3} />
              </ul>
            </div>
          </div>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3 col-md-2 sidebar">
              <ul className="nav nav-sidebar">
                <Menu auth={3} />
              </ul>
            </div>
            <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
              <h1 className="page-header">Test</h1>
              <DashboardRoutes />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardLayout;
