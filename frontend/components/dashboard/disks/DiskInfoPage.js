import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { last as arrLast } from 'lodash';

import { fetchLatestAttributes } from '../../../actions/diskActions';
import { DiskTimeFormat } from '../../../helpers/dates';

const AttributesSectionListRows = ({ diskId, attributes }) => {
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

const InformationSectionListRows = ({ informationData }) => {
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

class DiskInfoPage extends React.Component {
  componentWillMount() {
    const props = this.props;
    const diskId = props.match.params.diskId;

    props.dispatch(fetchLatestAttributes(diskId));
  }

  render() {
    const props = this.props;
    const diskId = props.match.params.diskId;
    const disk = this.props.disks.data[diskId];

    return (
      <div>
        <h1 className="page-header">{disk['Device Model']} <small>{disk['Serial Number']}</small></h1>
        <div className="table-responsive">
          <table className="table table-striped table-condensed">
            <thead><tr><th>Variable</th><th>Data</th></tr></thead>
            <tbody>
              <tr><td>ID:</td><td>{disk._id}</td></tr>
              <tr><td>Device model:</td><td>{disk['Device Model']}</td></tr>
              <tr><td>Serial number:</td><td>{disk['Serial Number']}</td></tr>
              <tr><td>Internal name:</td><td>{disk.internal_name}</td></tr>
              <tr><td>Physical location</td><td>{disk.location}</td></tr>
              <tr><td>First seen:</td><td>{DiskTimeFormat(disk.added)}</td></tr>
              <tr><td>Last seen:</td><td>{DiskTimeFormat(disk.updated)}</td></tr>
            </tbody>
          </table>
        </div>
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
            <AttributesSectionListRows attributes={disk.attr_section} />
          </table>
        </div>
        <h2 className="sub-header">Information section</h2>
        <div className="table-responsive">
          <table className="table table-striped table-condensed">
            <thead><tr><th>Attribute</th><th>Value</th></tr></thead>
            <InformationSectionListRows informationData={disk.info_section} />
          </table>
        </div>
      </div>
    );
  }
}

DiskInfoPage.propTypes = {
  disks: PropTypes.object.isRequired,
};

const MapStateToProps = (state /* , ownProps */) => {
  return {
    disks: state.disks,
  };
};

export default connect(MapStateToProps)(DiskInfoPage);
