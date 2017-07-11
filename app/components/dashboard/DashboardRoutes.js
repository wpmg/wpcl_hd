import React from 'react';
import { Route } from 'react-router-dom';

import DisksPage from './disks/DisksPage';

export default () => {
  return (
    <Route path="/" component={DisksPage} />
  );
};
