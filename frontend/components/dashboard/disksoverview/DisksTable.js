import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { DiskTimeFormat } from '../../../helpers/dates';

const DisksList = ({ disks }) => {
  return (
    <tbody>
      {Object.keys(disks).map((id) => {
        return (<tr key={id}>
          <td>
            <Link to={`/dashboard/disk/${id}`}>
              {disks[id]['Device Model']} <small>{disks[id]['Serial Number']}</small>
            </Link>
          </td>
          <td>{disks[id].internal_name}</td>
          <td>{disks[id].location}</td>
          <td>{DiskTimeFormat(disks[id].added)}</td>
          <td>{DiskTimeFormat(disks[id].updated)}</td>
        </tr>);
      })}
    </tbody>
  );
};

DisksList.propTypes = {
  disks: PropTypes.object.isRequired,
};

const DisksTable = (props) => {
  const tbody = (content) => { return <tbody><tr><td colSpan="5">{content}</td></tr></tbody>; };
  let content;

  if (props.status === 'not-fetched') {
    content = tbody('Fetching disks.');
  } else if (props.status === 'couldnt-fetch') {
    content = tbody('Couldn&apos;t fetch disks.');
  } else if (Object.keys(props.disks).length === 0) {
    content = tbody('No disks.');
  } else {
    content = <DisksList disks={props.disks} />;
  }

  return (
    <div>
      <h1 className="h1 page-h">Active disks</h1>
      <div className="table-responsive">
        <table className="table table-hover table-sm">
          <thead className="thead-inverse">
            <tr>
              <th>Model <small>Serial No</small></th>
              <th>Internal</th>
              <th>Location</th>
              <th>Added</th>
              <th>Last seen</th>
            </tr>
          </thead>
          {content}
        </table>
      </div>
    </div>
  );
};

DisksTable.propTypes = {
  status: PropTypes.string.isRequired,
  disks: PropTypes.object.isRequired,
};

export default DisksTable;
