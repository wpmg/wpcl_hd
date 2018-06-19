import React from 'react';
import PropTypes from 'prop-types';
import { last as arrLast } from 'lodash';

import octicons from 'octicons';

const DiskAttributesPresentational = (p) => {
  let tableBody;
  const notFetchedRow = (text) => {
    return (
      <tr>
        <td colSpan="10">{text}</td>
      </tr>
    );
  };

  if (p.attributesFetchedStatus === 'not-fetched') {
    tableBody = notFetchedRow('Attributes not fetched.');
  } else if (p.attributesFetchedStatus === 'couldnt-fetch') {
    tableBody = notFetchedRow('Couldn\'t fetch attributes.');
  } else {
    tableBody = p.attributes.map((attribute) => {
      return (
        <tr key={attribute.attr_id}>
          <td>{attribute.attr_id}</td>
          <th>{attribute.name}</th>
          <td>{arrLast(attribute.values).value}</td>
          <td>{attribute.thresh}</td>
          <td>{attribute.attr_type}</td>
          <td>{arrLast(attribute.values).raw}</td>
          <td>{attribute.failed}</td>
          <td>{arrLast(attribute.values).raw}</td>
          <td>{attribute.thresh}</td>
          <td>
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              data-toggle="modal"
              data-target="#attributeModal"
              onClick={() => { p.changeModalAttribute(attribute.attr_id); }}
              dangerouslySetInnerHTML={
                { __html: octicons.book.toSVG({ width: '1em', height: '1em' }) }
              }
            />
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="table-responsive">
      {p.children}
      <table className="table table-hover table-sm">
        <thead className="thead-dark">
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
        <tbody>
          {tableBody}
        </tbody>
      </table>
    </div>
  );
};

DiskAttributesPresentational.propTypes = {
  diskId: PropTypes.string.isRequired,
  attributes: PropTypes.array.isRequired,
  attributesFetchedStatus: PropTypes.string.isRequired,
  changeModalAttribute: PropTypes.func.isRequired,
};

export default DiskAttributesPresentational;
