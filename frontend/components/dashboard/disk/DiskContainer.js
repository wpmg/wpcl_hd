import React from 'react';
import PropTypes from 'prop-types';

import ajax from '../../../helpers/ajax';

import DiskPresentational from './DiskPresentational';

class DiskContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disk: {},
      diskFetchedStatus: 'not-fetched',
      attributes: [],
      attributesFetchedStatus: 'not-fetched',
    };
  }

  componentWillMount() {
    const diskId = this.props.match.params.diskId;

    // Fetch disk data (not attributes)
    ajax.getJson({
      url: `/api/v1/disk/${diskId}`,
      successCallback: (json) => {
        this.setState({ disk: json, diskFetchedStatus: 'fetched' });
      },
      errorCallback: (error) => {
        console.log(error);
        this.setState({ diskFetchedStatus: 'couldnt-fetch' });
      },
    });

    // Fetch latest disk attributes
    ajax.getJson({
      url: `/api/v1/disk/${diskId}/attribute/all`,
      successCallback: (json) => {
        this.setState({ attributes: json, attributesFetchedStatus: 'fetched' });
      },
      errorCallback: (error) => {
        console.log(error);
        this.setState({ attributesFetchedStatus: 'couldnt-fetch' });
      },
    });
  }

  render() {
    const state = this.state;
    const diskId = this.props.match.params.diskId;

    return (
      <DiskPresentational
        diskId={diskId}
        disk={state.disk}
        diskFetchedStatus={state.diskFetchedStatus}
        attributes={state.attributes}
        attributesFetchedStatus={state.attributesFetchedStatus}
      />
    );
  }
}

DiskContainer.propTypes = {
  match: PropTypes.object.isRequired,
};

export default DiskContainer;
