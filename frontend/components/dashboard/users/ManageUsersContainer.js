import React from 'react';
import PropTypes from 'prop-types';

import ajax from '../../../helpers/ajax';

class ManageUsersContainer extends React.Container {
  constructor(props) {
    super(props);

    this.state = { message: [], users: [] };

    this.getUsers = this.getUsers.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.updateUserAttribute = this.updateUserAttribute.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  componentWillMount() {
    this.getUsers();
  }

  getUsers(message) {
    const messageArray = message || 0 ? message : [];

    ajax.getJson({
      url: '/api/v1/users/',
      successCallback: (json) => {
        this.setState({ message: messageArray, users: json.map((u) => {
          return {
            id: u.id,
            username: u.attributes.username,
            authority: u.attributes.authority,
          };
        }) });
      },
      errorCallback: (error) => {
        messageArray.push('Failed to fetch users.');
        this.setState({ message: messageArray, users: [] });
      },
    });
    // ...success
    // ...fail
  }

  removeUser(id) {
    const humanIndex = this.state.users.findIndex((u) => { return u.id === id });

    if (humanIndex === -1) {
      this.setState({ message: ['Can\'t find the specified user.'] });
    } else {
      const human = this.state.users[humanIndex].email;

      ajax.deleteJson(id);
      // ...success
      this.getUsers(`Removed ${human}.`);
      // ...fail
      this.setState({ message: [`Failed to remove ${human}.`] });
    }
  }

  updateUserAttribute(id, attribute, value) {
    const humanIndex = this.state.users.findIndex((u) => { return u.id === id });

    if (humanIndex === -1) {
      this.setState({ message: ['Can\'t find the specified user.'] });
    } else {
      const human = this.state.users[humanIndex].email;

      ajax.patchJson(id, attribute, value);
      // ...success
      this.getUsers(`Successfully updated ${human}.`);
      // ...fail
      this.setState({ message: [`Failed to update ${human}.`] });
    }
  }

  addUser(user) {
    const humanIndex = this.state.users.findIndex((u) => { return u.email === user.email });

    if (humanIndex !== -1) {
      this.setState({ message: [`There already exists a user with e-mail ${user.email}.`] });
    } else {
      ajax.postJson(userFormatted);
      // ...success
      this.getUsers(`Successfully added ${user.email}`);
      // ...fail
      this.setState({ message: [`An error occured when trying to add ${user.email}.`] });
    }
  }

  render() {
    return(
      <ManageUsersPresentational
      authority={this.auth.authority}
      users={this.state.users}
      userMethods={{
        getUsers: this.getUsers,
        removeUser: this.removeUser,
        updateUserAttribute: this.updateUserAttribute,
        addUser: this.addUser,
      }}
      message={this.state.message}
      />
    );
  }
}

ManageUsersContainer.propTypes = {

};

// Connect...
export default ManageUsersContainer;
