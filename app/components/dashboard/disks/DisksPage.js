import React, {PropTypes} from 'react';  
import {connect} from 'react-redux'; 

import {ActionLoadDisks} from '../../../apis/capi_disks';

import DiskList from './DiskList';
// import * as catActions from '../../actions/catActions';

class DisksPage extends React.Component {
  componentWillMount() {
    this.props.dispatch(ActionLoadDisks());
  }

  render() {
    return (
      <div>
        <h1>Disk list</h1>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Temp</th>
            </tr>
          </thead>
          <DiskList disks={this.props.disks} />
        </table>
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
