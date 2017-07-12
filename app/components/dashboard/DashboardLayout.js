import React from 'react';

import DashboardRoutes from './DashboardRoutes';
import SignedInAs from './SignedInAs';
import Menu from './Menu';

const DashboardLayout = () => {
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
            <SignedInAs />
            <Menu type="collapsable" isNavBarMenu={false} location={location} />
            <Menu type="navbar" isNavBarMenu location={location} />
          </div>
        </div>
      </nav>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-3 col-md-2 sidebar">
            <Menu type="sidebar" isNavBarMenu={false} location={location} />
          </div>
          <DashboardRoutes />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
