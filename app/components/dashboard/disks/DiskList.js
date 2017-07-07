import React, {PropTypes} from 'react';

const DiskList = ({disks}) => {  
  return (
      <tbody>
        {disks.map((disk) => {
          return (<tr>
            <td>{disk.id}</td>
            <td>{disk.name}</td>
            <td>{disk.temp}</td>
          </tr>);
        })}
      </tbody>
  );
};

DiskList.propTypes = {  
  disks: PropTypes.array.isRequired
};

export default DiskList;  
