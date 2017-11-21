import React from 'react';

import ajax from '../../../helpers/ajax';

import DisksTable from './DisksTable';

class DisksOverviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { disks: {}, disksFetchedStatus: 'not-fetched' };
  }

  componentWillMount() {
    ajax.getJson({
      url: '/api/v1/disk/all',
      successCallback: (json) => {
        this.setState({ disks: json, disksFetchedStatus: 'fetched' });
      },
      errorCallback: () => {
        this.setState({ disksFetchedStatus: 'couldnt-fetch' });
      },
    });
  }

  render() {
    return <DisksTable status={this.state.disksFetchedStatus} disks={this.state.disks} />;
  }
}

export default DisksOverviewPage;
