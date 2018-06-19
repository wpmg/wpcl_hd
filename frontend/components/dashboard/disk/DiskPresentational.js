import React from 'react';
import PropTypes from 'prop-types';

import { DiskTimeFormat } from '../../../helpers/dates';

import DiskAttributesContainer from './DiskAttributesContainer';
import DiskInfoInputContainer from './DiskInfoInputContainer';

const SimpleTable = (props) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm">
        <thead className="thead-dark">
          <tr>
            {
              props.headers.map((text, i) => {
                return (
                  <th key={i}>{text}</th>
                );
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            props.rows.map((row) => {
              return (
                <tr key={row.title}>
                  <th>{row.title}:</th>
                  <td>{row.value}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
};

SimpleTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  })).isRequired,
};

const DiskPresentational = (props) => {
  const disk = props.disk;
  const attributes = props.attributes;
  const diskId = props.diskId;

  let h1 = 'Unknown disk';
  let headTable;
  let infoTable;

  if (props.diskFetchedStatus === 'not-fetched') {
    headTable = [{ title: 'Status', value: 'Disk not fetched.' }];
    infoTable = headTable.slice(0);
  } else if (props.diskFetchedStatus === 'couldnt-fetch') {
    headTable = [{ title: 'Status', value: 'Couldn\'t fetch disk.' }];
    infoTable = headTable.slice(0);
  } else {
    h1 = <h1 className="h1 page-h">{disk['Device Model']} <small>{disk['Serial Number']} </small></h1>;
    headTable = [
      { title: 'ID', value: diskId },
      { title: 'Device model', value: disk['Device Model'] },
      { title: 'Serial number', value: disk['Serial Number'] },
      { title: 'Internal name', value: disk.internal_name },
      { title: 'Physical location', value: disk.location },
      { title: 'First seen', value: DiskTimeFormat(disk.added) },
      { title: 'Last seen', value: DiskTimeFormat(disk.updated) },
      { title: 'Custom msg', value: <DiskInfoInputContainer
        infoKey="customText"
        diskId={diskId}
        customText={disk.customText || ''}
      /> },
    ];
    infoTable = disk.info_section.map((o) => {
      return { title: o.name, value: o.value };
    });
  }

  return (
    <div>
      {h1}
      <SimpleTable
        headers={['Variable', 'Data']}
        rows={headTable}
      />
      <h2 className="h2 page-h">Attributes section</h2>
      <DiskAttributesContainer
        diskId={diskId}
        attributes={attributes}
        attributesFetchedStatus={props.attributesFetchedStatus}
      />
      <h2 className="h2 page-h">Information section</h2>
      <SimpleTable
        headers={['Attribute', 'Value']}
        rows={infoTable}
      />
    </div>
  );
};

DiskPresentational.propTypes = {
  diskId: PropTypes.string.isRequired,
  disk: PropTypes.object.isRequired,
  diskFetchedStatus: PropTypes.string.isRequired,
  attributes: PropTypes.array.isRequired,
  attributesFetchedStatus: PropTypes.string.isRequired,
};

export default DiskPresentational;
