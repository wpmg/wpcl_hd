import React from 'react';
import { Route } from 'react-router-dom';

import DisksOverviewPage from './disksoverview/DisksOverviewPage';
import DiskInfoPage from './disk/DiskInfoPage';
import AttributesPage from './attributes/AttributesPage';

export default () => {
  return (
    <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
      <Route path="/dashboard" exact component={DisksOverviewPage} />
      <Route path="/dashboard/disk/:diskId" exact component={DiskInfoPage} />
      <Route path="/dashboard/attributes" exact component={AttributesPage} />
    </div>
  );
};
