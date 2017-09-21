import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchAuth } from '../../actions/authActions';

const authToDegree = (auth) => {
  switch (auth) {
    case 1:
      return 'professor';
    case 2:
      return 'master';
    case 3:
      return 'bachelor';
    default:
      return '';
  }
};

class SignedInAs extends React.Component {
  constructor(props) {
    super(props);
    if (props.auth.authority === 0) {
      props.dispatch(fetchAuth());
    }
  }

  render() {
    const auth = this.props.auth;

    return (
      <p className="navbar-text hidden-xs">Signed in as {auth.username} ({authToDegree(auth.authority)})</p>
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
export { authToDegree };
