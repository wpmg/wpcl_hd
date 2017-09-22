import React from 'react';
import PropTypes from 'prop-types';

const InfoModuleTableBody = ({ informationData }) => {
  return (
    <tbody>
      {
        informationData.map((info) => {
          return (
            <tr key={info.name}>
              <td>{info.name}</td>
              <td>{info.value}</td>
            </tr>
          );
        })
      }
    </tbody>
  );
};

const DiskInfoModule = ({ fetchedStatus, disk }) => {
  if (fetchedStatus === 'not-fetched') {
    return (
      <div>
        <h2 className="sub-header">Information section</h2>
        <p>Fetching information section.</p>
      </div>
    );
  } else if (fetchedStatus === 'couldnt-fetch') {
    return (
      <div>
        <h2 className="sub-header">Information section</h2>
        <p>Couldn&apos;t fetch information section.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="sub-header">Information section</h2>
      <div className="table-responsive">
        <table className="table table-striped table-condensed">
          <thead><tr><th>Attribute</th><th>Value</th></tr></thead>
          <InfoModuleTableBody informationData={disk.info_section} />
        </table>
      </div>
    </div>
  );
};

InfoModuleTableBody.propTypes = {
  informationData: PropTypes.array.isRequired,
};

DiskInfoModule.propTypes = {
  fetchedStatus: PropTypes.string.isRequired,
  disk: PropTypes.object,
};

DiskInfoModule.defaultProps = {
  disk: undefined,
};

export default DiskInfoModule;
