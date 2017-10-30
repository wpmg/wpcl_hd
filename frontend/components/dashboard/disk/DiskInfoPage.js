import React from 'react';
import PropTypes from 'prop-types';

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
    fetch(`/api/v1/disk/${diskId}`, { credentials: 'include' })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState(() => {
          return { disk: json, diskFetchedStatus: 'fetched' };
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState(() => {
          return { diskFetchedStatus: 'couldnt-fetch' };
        });
      });

    // Fetch latest disk attributes
    fetch(`/api/v1/disk/${diskId}/attribute/all`, { credentials: 'include' })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState(() => {
          return { attributes: json, attributesFetchedStatus: 'fetched' };
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState(() => {
          return { attributesFetchedStatus: 'couldnt-fetch' };
        });
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
