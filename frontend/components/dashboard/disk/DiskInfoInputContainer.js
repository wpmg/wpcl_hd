import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ajax from '../../../helpers/ajax';

import DiskInfoInputPresentational from './DiskInfoInputPresentational';

class DiskInfoInputContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { customText: props.customText, editMode: false, editText: props.customText, saving: false };

    this.enterEditMode = this.enterEditMode.bind(this);
    this.exitEditMode = this.exitEditMode.bind(this);
    this.saveCustomText = this.saveCustomText.bind(this);
    this.setEditText = this.setEditText.bind(this);
  }

  setEditText(event) {
    this.setState({ editText: event.target.value });
  }

  saveCustomText() {
    this.setState({ saving: true });

    ajax.putJson({
      url: `/api/v1/disk/${this.props.diskId}/${this.props.infoKey}`,
      body: { customText: this.state.editText },
      successCallback: (json) => {
        this.setState({ customText: json.customText, editMode: false, editText: json.customText, saving: false });
      },
    });
  }

  // Get customText before edit mode is entered
  enterEditMode() {
    ajax.getJson({
      url: `/api/v1/disk/${this.props.diskId}/${this.props.infoKey}`,
      successCallback: (json) => {
        this.setState({ customText: json.customText, editMode: true, editText: json.customText });
      },
    });
  }

  exitEditMode() {
    this.setState({ editMode: false });
  }

  render() {
    return (
      <DiskInfoInputPresentational
        authority={this.props.auth.authority}
        editMode={this.state.editMode}
        enterEditMode={this.enterEditMode}
        exitEditMode={this.exitEditMode}
        customText={this.state.customText}
        editText={this.state.editText}
        setEditText={this.setEditText}
        saveCustomText={this.saveCustomText}
        disabled={this.state.saving}
      />
    );
  }
}

DiskInfoInputContainer.propTypes = {
  infoKey: PropTypes.string.isRequired,
  diskId: PropTypes.string.isRequired,
  customText: PropTypes.string.isRequired,
  auth: PropTypes.shape({
    authority: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

const MapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(MapStateToProps)(DiskInfoInputContainer);
