import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchAuth } from '../../actions/authActions';

class SignedInAs extends React.Component {
  constructor(props) {
    super(props);

    props.dispatch(fetchAuth());
  }

  authToDegree() {
    switch (this.props.auth.authority) {
      case 1:
        return 'professor';
      case 2:
        return 'master';
      case 3:
        return 'bachelor';
      default:
        return '';
    }
  }

  render() {
    return (
      <p className="navbar-text">Signed in as {this.props.auth.username} ({this.authToDegree()})</p>
    );
  }
}

SignedInAs.propTypes = {
  auth: PropTypes.shape({
    authority: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const MapStateToProps = (state /* , ownProps */) => {
  return {
    auth: state.auth,
  };
};

export default connect(MapStateToProps)(SignedInAs);
