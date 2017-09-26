import React from 'react';

import DisksList from './DisksList';

class DisksOverviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { disks: undefined, disksFetchedStatus: 'not-fetched' };
  }

  componentWillMount() {
    fetch('/api/v1/disk/all', { credentials: 'include' })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState(() => {
          return { disks: json, disksFetchedStatus: 'fetched' };
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState(() => {
          return { disksFetchedStatus: 'couldnt-fetch' };
        });
      });
  }

  render() {
    let content;

    if (this.state.disksFetchedStatus === 'not-fetched') {
      content = (<p>Fetching disks.</p>);
    } else if (this.state.disksFetchedStatus === 'couldnt-fetch') {
      content = (<p>Couldn&apos;t fetch disks.</p>);
    } else {
      content = (
        <table className="table table-hover table-sm table-responsive">
          <thead className="thead-inverse">
            <tr>
              <th>Model <small>Serial No</small></th>
              <th>Internal</th>
              <th>Location</th>
              <th>Added</th>
              <th>Last seen</th>
            </tr>
          </thead>
          <DisksList disks={this.state.disks} />
        </table>
      );
    }

    return (
      <div>
        <h1 className="h1">Active disks</h1>
        {content}
      </div>
    );
  }
}

export default DisksOverviewPage;
