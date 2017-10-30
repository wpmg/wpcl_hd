import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import octicons from 'octicons';

class DiskCustomText extends React.Component {
  constructor(props) {
    super(props);

    this.state = { customText: props.customText, editMode: false, editText: props.customText, saving: false };

    this.enterEditMode = this.enterEditMode.bind(this);
    this.exitEditMode = this.exitEditMode.bind(this);
    this.saveCustomText = this.saveCustomText.bind(this);
    this.setCustomTextLocally = this.setCustomTextLocally.bind(this);
  }

  setCustomTextLocally(event) {
    this.setState({ editText: event.target.value });
  }

  saveCustomText() {
    this.setState(() => {
      return { saving: true };
    });

    const customText = JSON.stringify({ customText: this.state.editText });
    console.log(customText);
    fetch(
      `/api/v1/disk/${this.props.diskId}/customText`,
      {
        credentials: 'include',
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: customText,
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        this.setState({ customText: json.customText, editMode: false, editText: json.customText, saving: false });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Get customText before edit mode is entered
  enterEditMode() {
    fetch(`/api/v1/disk/${this.props.diskId}/customText`, { credentials: 'include' })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        this.setState(() => {
          return { customText: json.customText, editMode: true, editText: json.customText };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  exitEditMode() {
    this.setState(() => {
      return { editMode: false };
    });
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
              onChange={this.setCustomTextLocally}
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
