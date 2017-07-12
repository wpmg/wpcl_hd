import React from 'react';
import { Route } from 'react-router-dom';

import DisksPage from './disks/DisksPage';
import Attributes from './attributes/AttributesPage';

export default () => {
  return (
    <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
      <Route path="/dashboard" exact component={DisksPage} />
      <Route path="/dasboard/attributes" exact component={Attributes} />
    </div>
  );
};
