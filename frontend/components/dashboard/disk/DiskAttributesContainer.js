import React from 'react';
import PropTypes from 'prop-types';

import DiskAttributesPresentational from './DiskAttributesPresentational';
import AttributeModalContainer from './AttributeModalContainer';

class DiskAttributesContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { modalAttributeId: 0 };

    this.changeModalAttribute = this.changeModalAttribute.bind(this);
  }

  changeModalAttribute(attributeId) {
    if (attributeId === this.state.modalAttributeId) {
      return false;
    }

    this.setState({ modalAttributeId: attributeId });
    return true;
  }

  render() {
    const p = this.props;

    return (
      <DiskAttributesPresentational
        diskId={p.diskId}
        attributes={p.attributes}
        attributesFetchedStatus={p.attributesFetchedStatus}
        changeModalAttribute={this.changeModalAttribute}
      >
        <AttributeModalContainer diskId={p.diskId} attributeId={this.state.modalAttributeId} attributes={p.attributes} />
      </DiskAttributesPresentational>
    );
  }
}

DiskAttributesContainer.propTypes = {
  diskId: PropTypes.string.isRequired,
  attributes: PropTypes.array.isRequired,
  attributesFetchedStatus: PropTypes.string.isRequired,
};

export default DiskAttributesContainer;
