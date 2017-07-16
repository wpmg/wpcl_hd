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
