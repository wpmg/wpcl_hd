import React from 'react';
import { Route } from 'react-router-dom';

import DisksOverviewPage from './disksoverview/DisksOverviewPage';
import DiskInfoPage from './disk/DiskInfoPage';
import AttributesPage from './attributes/AttributesPage';

export default () => {
  return (
    <main className="col-md-9 col-xl-10 ml-auto main">
      <Route path="/dashboard" exact component={DisksOverviewPage} />
      <Route path="/dashboard/disk/:diskId" exact component={DiskInfoPage} />
      <Route path="/dashboard/attributes" exact component={AttributesPage} />
    </main>
  );
};
