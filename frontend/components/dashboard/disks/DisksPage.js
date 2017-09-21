import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchAllDisks } from '../../../actions/diskActions';

import DiskList from './DiskList';

class DisksPage extends React.Component {
  componentWillMount() {
    const props = this.props;
    const { store } = this.context;
    const state = store.getState();

    if (state.disks.latestFetch < ((new Date()).getTime() - (1000 * 60 * 5))) {
      props.dispatch(fetchAllDisks());
    }
  }

  render() {
    if (this.props.disks.latestFetch === 0) {
      return null;
    }

    return (
      <div>
        <h1 className="page-header">Active disks</h1>
        <div className="table-responsive">
          <table className="table table-striped table-condensed">
            <thead>
              <tr>
                <th>Model <small>Serial No</small></th>
                <th>Internal</th>
                <th>Location</th>
                <th>Added</th>
                <th>Last seen</th>
              </tr>
            </thead>
            <DiskList disks={this.props.disks.data} />
          </table>
        </div>
      </div>
    );
  }
}

DisksPage.propTypes = {
  disks: PropTypes.object.isRequired,
};

DisksPage.contextTypes = {
  store: PropTypes.object,
};

const MapStateToProps = (state /* , ownProps */) => {
  return {
    disks: state.disks,
  };
};

export default connect(MapStateToProps)(DisksPage);
