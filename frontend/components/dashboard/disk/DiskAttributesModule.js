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
              <td>
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-dark">Graph</button>
                  <button
                    type="button"
                    className="btn btn-sm btn-dark dropdown-toggle dropdown-toggle-split"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Toggle Dropdown</span>
                  </button>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#a">Graph raw</a>
                    <a className="dropdown-item" href="#a">See data</a>
                  </div>
                </div>
              </td>
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
        <h2 className="h2">Attributes section</h2>
        <p>Fetching attributes.</p>
      </div>
    );
  } else if (fetchedStatus === 'couldnt-fetch') {
    return (
      <div>
        <h2 className="h2">Attributes section</h2>
        <p>Couldn&apos;t fetch attributes.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="h2">Attributes section</h2>
      <table className="table table-hover table-sm table-responsive">
        <thead className="thead-inverse">
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
            <th />
          </tr>
        </thead>
        <AttributesModuleTableBody attributes={attributes} />
      </table>
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
