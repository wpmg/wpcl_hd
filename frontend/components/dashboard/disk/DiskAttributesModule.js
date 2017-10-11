import React from 'react';
import PropTypes from 'prop-types';
import { last as arrLast } from 'lodash';

import AttributeModal from './AttributeModal';

const AttributesModuleTableBody = ({ attributes, changeModalAttribute }) => {
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
                <button
                  type="button"
                  className="btn btn-sm btn-dark"
                  data-toggle="modal"
                  data-target="#attributeModal"
                  onClick={() => { changeModalAttribute(attribute.attr_id); }}
                >
                  Graph
                </button>
              </td>
            </tr>
          );
        })
      }
    </tbody>
  );
};

class DiskAttributesModule extends React.Component {
  constructor(props) {
    super(props);

    this.state = { modalAttribute: { attr_id: 0 } };

    this.changeModalAttribute = this.changeModalAttribute.bind(this);
  }

  changeModalAttribute(attributeId) {
    if (attributeId === this.state.modalAttribute.attr_id) {
      return false;
    }

    const attributeIndex = this.props.attributes.findIndex((attribute) => {
      if (attribute.attr_id === attributeId) {
        return true;
      }

      return false;
    });

    if (attributeIndex > -1) {
      this.setState(() => {
        return { modalAttribute: this.props.attributes[attributeIndex] };
      });
    }

    return true;
  }

  render() {
    const props = this.props;

    if (props.fetchedStatus === 'not-fetched') {
      return (
        <div>
          <h2 className="h2 page-h">Attributes section</h2>
          <p>Fetching attributes.</p>
        </div>
      );
    } else if (props.fetchedStatus === 'couldnt-fetch') {
      return (
        <div>
          <h2 className="h2 page-h">Attributes section</h2>
          <p>Couldn&apos;t fetch attributes.</p>
        </div>
      );
    }

    return (
      <div>
        <h2 className="h2 page-h">Attributes section</h2>
        <AttributeModal diskId={props.diskId} attribute={this.state.modalAttribute} />
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
          <AttributesModuleTableBody attributes={props.attributes} changeModalAttribute={this.changeModalAttribute} />
        </table>
      </div>
    );
  }
}

AttributesModuleTableBody.propTypes = {
  attributes: PropTypes.array,
  changeModalAttribute: PropTypes.func.isRequired,
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
