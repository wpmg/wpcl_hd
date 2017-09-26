import React from 'react';

import DashboardRoutes from './DashboardRoutes';
import SignedInAs from './SignedInAs';
import Menu from './Menu';

const DashboardLayout = () => {
  return (
    <div> {/* className="container-fluid" */}
      <nav className="navbar navbar-dark bg-dark fixed-top navbar-expand-md">
        <div className="navbar-header">
          <a className="navbar-brand" href="/dashboard">WPCL HD CC</a>
        </div>
        <button
          type="button"
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div id="navbar" className="collapse navbar-collapse">
          <SignedInAs />
          <Menu type="collapsable" location={location} />
          <Menu type="navbar" location={location} />
        </div>
      </nav>
      <div className="container-fluid">
        <div className="d-none d-md-block col-md-3 col-xl-2 sidebar">
          <Menu type="sidebar" location={location} />
        </div>
        <DashboardRoutes />
      </div>
    </div>
  );
};

export default DashboardLayout;
