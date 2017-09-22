import React from 'react';
import PropTypes from 'prop-types';
import { last as arrLast } from 'lodash';

const AttributesModuleTableBody = ({ attributes }) => {
  if (typeof attributes === 'undefined') {
    return null;
  }

  return (
    <tbody>
      {
        attributes.map((attribute) => {
          return (
            <tr key={attribute.attr_id}>
              <td>{attribute.attr_id}</td>
              <td>{attribute.name}</td>
              <td>{arrLast(attribute.values).value}</td>
              <td>{attribute.thresh}</td>
              <td>{attribute.attr_type}</td>
              <td>{arrLast(attribute.values).raw}</td>
              <td>{attribute.failed}</td>
              <td>{arrLast(attribute.values).raw}</td>
              <td>{attribute.thresh}</td>
              <td>{attribute.time}</td>
              <td>Graph</td>
              <td>Graph</td>
              <td>Data</td>
            </tr>
          );
        })
      }
    </tbody>
  );
};

const DiskAttributesModule = ({ fetchedStatus, attributes }) => {
  if (fetchedStatus === 'not-fetched') {
    return (
      <div>
        <h2 className="sub-header">Attributes section</h2>
        <p>Fetching attributes.</p>
      </div>
    );
  } else if (fetchedStatus === 'couldnt-fetch') {
    return (
      <div>
        <h2 className="sub-header">Attributes section</h2>
        <p>Couldn&apos;t fetch attributes.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="sub-header">Attributes section</h2>
      <div className="table-responsive">
        <table className="table table-striped table-condensed">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Value</th>
              <th>Thresh</th>
              <th>Type</th>
              <th>Raw</th>
              <th>Failed</th>
              <th>Raw*</th>
              <th>Thresh*</th>
              <th>Latest update</th>
              <th /><th /><th />
            </tr>
          </thead>
          <AttributesModuleTableBody attributes={attributes} />
        </table>
      </div>
    </div>
  );
};

AttributesModuleTableBody.propTypes = {
  attributes: PropTypes.array,
};

AttributesModuleTableBody.defaultProps = {
  attributes: undefined,
};

DiskAttributesModule.propTypes = {
  fetchedStatus: PropTypes.string.isRequired,
  attributes: PropTypes.array,
};

DiskAttributesModule.defaultProps = {
  attributes: undefined,
};

export default DiskAttributesModule;
