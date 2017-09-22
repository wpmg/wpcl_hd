import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { DiskTimeFormat } from '../../../helpers/dates';

const DiskList = ({ disks }) => {
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

DiskList.propTypes = {
  disks: PropTypes.object.isRequired,
};

export default DiskList;
