import React from 'react';
import PropTypes from 'prop-types';

import { DiskTimeFormat } from '../../../helpers/dates';

const DiskHeadModule = ({ diskId, fetchedStatus, disk }) => {
  if (fetchedStatus === 'not-fetched') {
    return (
      <div>
        <h1 className="h1 page-h">Disk ID: {diskId}</h1>
        <p>Fetching disk.</p>
      </div>
    );
  } else if (fetchedStatus === 'couldnt-fetch') {
    return (
      <div>
        <h1 className="h1 page-h">Disk ID: {diskId}</h1>
        <p>Couldn&apos;t fetch disk.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="h1 page-h">{disk['Device Model']} <small>{disk['Serial Number']}</small></h1>
      <table className="table table-hover table-sm table-responsive">
        <thead className="thead-inverse"><tr><th>Variable</th><th>Data</th></tr></thead>
        <tbody>
          <tr><td>ID:</td><td>{diskId}</td></tr>
          <tr><td>Device model:</td><td>{disk['Device Model']}</td></tr>
          <tr><td>Serial number:</td><td>{disk['Serial Number']}</td></tr>
          <tr><td>Internal name:</td><td>{disk.internal_name}</td></tr>
          <tr><td>Physical location</td><td>{disk.location}</td></tr>
          <tr><td>First seen:</td><td>{DiskTimeFormat(disk.added)}</td></tr>
          <tr><td>Last seen:</td><td>{DiskTimeFormat(disk.updated)}</td></tr>
        </tbody>
      </table>
    </div>
  );
};

DiskHeadModule.propTypes = {
  diskId: PropTypes.string.isRequired,
  fetchedStatus: PropTypes.string.isRequired,
  disk: PropTypes.object,
};

DiskHeadModule.defaultProps = {
  disk: undefined,
};

export default DiskHeadModule;
