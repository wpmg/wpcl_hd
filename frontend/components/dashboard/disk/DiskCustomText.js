import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import octicons from 'octicons';

import ajax from '../../../helpers/ajax';

class DiskCustomText extends React.Component {
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
      url: `/api/v1/disk/${this.props.diskId}/customText`,
      body: { customText: this.state.editText },
      successCallback: (json) => {
        this.setState({ customText: json.customText, editMode: false, editText: json.customText, saving: false });
      },
    });
  }

  // Get customText before edit mode is entered
  enterEditMode() {
    ajax.getJson({
      url: `/api/v1/disk/${this.props.diskId}/customText`,
      successCallback: (json) => {
        this.setState({ customText: json.customText, editMode: true, editText: json.customText });
      },
    });
  }

  exitEditMode() {
    this.setState({ editMode: false });
  }

  render() {
    const editMode = this.state.editMode;

    const authority = this.props.auth.authority;

    if (authority > 2 || editMode === false) {
      let pencil;
      if (!(authority > 2)) {
        pencil = (
          <button
            type="button"
            className="btn btn-sm btn-secondary float-right"
            onClick={() => { this.enterEditMode(); }}
            dangerouslySetInnerHTML={{ __html: octicons.pencil.toSVG({ width: '1em', height: '1em' }) }}
          />
        );
      }

      return (
        <tr>
          <td>Custom msg:</td>
          <td>
            {this.state.customText}
            {pencil}
          </td>
        </tr>
      );
    }

    // Onclick save saveChanges
    // oninputchange setstate inputvalue

    const disabled = this.state.saving;

    return (
      <tr>
        <td>Custom msg:</td>
        <td>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              aria-label="Custom message"
              value={this.state.editText}
              onChange={this.setEditText}
              disabled={disabled}
            />
            <span className="input-group-btn">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => { this.exitEditMode(); }}
                dangerouslySetInnerHTML={{ __html: octicons.x.toSVG({ width: '1em', height: '1em' }) }}
                disabled={disabled}
              />
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => { this.saveCustomText(); }}
                dangerouslySetInnerHTML={{ __html: octicons.check.toSVG({ width: '1em', height: '1em' }) }}
                disabled={disabled}
              />
            </span>
          </div>
        </td>
      </tr>
    );
  }
}

DiskCustomText.propTypes = {
  diskId: PropTypes.string.isRequired,
  customText: PropTypes.string,
  auth: PropTypes.shape({
    authority: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

DiskCustomText.defaultProps = {
  customText: '',
};

const MapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(MapStateToProps)(DiskCustomText);
