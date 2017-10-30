import React from 'react';
import PropTypes from 'prop-types';

import ajax from '../../../helpers/ajax';

import DiskHeadModule from './DiskHeadModule';
import DiskAttributesModule from './DiskAttributesModule';
import DiskInfoModule from './DiskInfoModule';

/*
 * class DiskInfoPage
 * renders a page for an individual disk
 */

class DiskInfoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disk: undefined,
      diskFetchedStatus: 'not-fetched',
      attributes: undefined,
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
    const disk = state.disk;
    const attributes = state.attributes;

    return (
      <div>
        <DiskHeadModule diskId={diskId} fetchedStatus={state.diskFetchedStatus} disk={disk} />
        <DiskAttributesModule
          diskId={diskId}
          fetchedStatus={state.attributesFetchedStatus}
          attributes={attributes}
        />
        <DiskInfoModule fetchedStatus={state.diskFetchedStatus} disk={disk} />
      </div>
    );
  }
}

DiskInfoPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default DiskInfoPage;
