import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const PadLeft = (s, l, p) => {
  p = p.toString();
  l = parseInt(l) - s.toString().length;
  l = l < 0 ? 0 : l;
  return p.repeat(l) + s;
};

const DiskTimeFormat = (ms) => {
  let t = new Date(ms);
  let ts = t.getFullYear().toString().slice(2)
    + PadLeft(t.getMonth() + 1, 2, '0')
    + PadLeft(t.getDate(), 2, '0')
    + '@'
    + PadLeft(t.getHours(), 2, '0')
    + PadLeft(t.getMinutes(), 2, '0')
    + PadLeft(t.getSeconds(), 2, '0');

  return ts;
};

const DiskList = ({disks}) => {
  return (
    <tbody>
      {disks.map((disk) => {
        return (<tr key={disk.id}>
          <td><Link to={'/dashboard/disk/' + disk._id}>{disk['Device Model']} <small>{disk['Serial Number']}</small></Link></td>
          <td>{disk['internal_name']}</td>
          <td>{disk['location']}</td>
          <td>{DiskTimeFormat(disk.added)}</td>
          <td>{DiskTimeFormat(disk.updated)}</td>
        </tr>);
      })}
    </tbody>
  );
};

DiskList.propTypes = {
  disks: PropTypes.array.isRequired
};

export default DiskList;
