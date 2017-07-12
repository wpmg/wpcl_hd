import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PadLeft = (s, l, p) => {
  const ps = p.toString();
  let li = parseInt(l, 10) - s.toString().length;
  li = li < 0 ? 0 : li;
  return ps.repeat(li) + s;
};

const DiskTimeFormat = (ms) => {
  const t = new Date(ms);
  const ts = t.getFullYear().toString().slice(2)
    + PadLeft(t.getMonth() + 1, 2, '0')
    + PadLeft(t.getDate(), 2, '0')
    + '@'
    + PadLeft(t.getHours(), 2, '0')
    + PadLeft(t.getMinutes(), 2, '0')
    + PadLeft(t.getSeconds(), 2, '0');

  return ts;
};

const DiskList = ({ disks }) => {
  return (
    <tbody>
      {disks.map((disk) => {
        return (<tr key={disk._id}>
          <td>
            <Link to={`/dashboard/disk/${disk._id}`}>
              {disk['Device Model']} <small>{disk['Serial Number']}</small>
            </Link>
          </td>
          <td>{disk.internal_name}</td>
          <td>{disk.location}</td>
          <td>{DiskTimeFormat(disk.added)}</td>
          <td>{DiskTimeFormat(disk.updated)}</td>
        </tr>);
      })}
    </tbody>
  );
};

DiskList.propTypes = {
  disks: PropTypes.array.isRequired,
};

export default DiskList;
