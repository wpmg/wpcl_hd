import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { ActionLoadDisks } from '../../../apis/capi_disks';

import DiskList from './DiskList';

class DisksPage extends React.Component {
  componentWillMount() {
    this.props.dispatch(ActionLoadDisks());
  }

  render() {
    return (
      <div>
        <h1>Active disks</h1>
        <div className='table-responsive'>
          <table className='table table-striped table-condensed'>
            <thead>
              <tr>
                <th>Model <small>Serial No</small></th>
                <th>Internal</th>
                <th>Location</th>
                <th>Added</th>
                <th>Last seen</th>
              </tr>
            </thead>
            <DiskList disks={this.props.disks} />
          </table>
        </div>
      </div>
    );
  }
}

DisksPage.propTypes = {
  disks: PropTypes.array.isRequired
};

const MapStateToProps = (state /* , ownProps */) => {
  return {
    disks: state.disks
  };
};

export default connect(MapStateToProps)(DisksPage);
