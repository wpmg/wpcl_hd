import React from 'react';
import PropTypes from 'prop-types';

class UserDeleteModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { confirmed: false };
  }

  componentWillRecieveProps(p) {
    this.setState({ confirmed: false });
  }

  changeConfirmedStatus(s) {
    this.setState({ confirmed: s });
  }

  deleteUser() {
    if (this.state.confirmed === true) {
      this.props.deleteUser(this.props.id);
      // ...close modal independent of success
    }
  }

  render() {
    return(
      <modal...>
        <button confirm>
        </button>
      </modal>
    );
  }
};

class ManageUsersPresentational extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deleteUserId: 0 };
  }

  setUserToDelete(id) {
    this.setState({ deleteUserId: id });
  }

  render() {
    const p = this.props;
    const authority = p.authority || 0 ? p.authority : 0;
    if (authority !== 1) {
      return(
        <div>
          <h1 className="h1 page-header">Manage users</h1>
          <p>Not authorized to view this page.</p>
        </div>
      );
    }


    return(
      <div>
        <h1 className="h1 page-header">Manage users</h1>
        <div className="table-responsive">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>E-mail</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                p.users.map((u) => {
                  return(
                    <tr key={u.id}>
                      <td>{u.email}</td>
                      <td>edit-sign</td>
                      <td>p-sign</td>
                      <td>rm-sign</td>
                    </tr>
                  );
                });
              }
            </tbody>
          </table>
        </div>
        <button>
          Add new user.
        </button>
      </div>
    );
  }
}

export default ManageUsersPresentational;
