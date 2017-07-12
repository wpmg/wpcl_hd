import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MenuUl from './MenuUl';

const menuGroups = (isNavbarMenu) => {
  if (isNavbarMenu) {
    return [[
      { name: 'Settings', path: '/dashboard/settings', auth: 3, show: true },
      { name: 'Log out', path: '/logout', auth: 3, show: true, useA: true },
    ]];
  }

  return [
    [
      { name: 'Overview', path: '/dashboard', auth: 3, show: true, children: [
        { name: 'Disk #', path: '/dashboard/disk', auth: 3, show: false },
      ] },
      { name: 'Attributes', path: '/dashboard/attributes', auth: 3, show: true },
    ],
    [
      { name: 'Edit locations', path: '/dashboard/admin/locations', auth: 2, show: true },
    ],
    [
      { name: 'Edit users', path: '/dashboard/admin/users', auth: 1, show: true },
    ],
  ];
};

const Menu = ({ auth, location, type }) => {
  if (auth.authority === 0) {
    return null;
  }

  return (
    <div>
      {menuGroups(type === 'navbar').map((menuGroup, i) => {
        return <MenuUl key={i.toString()} menuGroup={menuGroup} auth={auth} location={location} type={type} />;
      })}
    </div>
  );
};


Menu.propTypes = {
  auth: PropTypes.shape({
    authority: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
  type: PropTypes.string,
};

Menu.defaultProps = {
  type: 'sidebar',
};


const MapStateToProps = (
  state
  // , ownProps
) => {
  return {
    auth: state.auth,
  };
};

export default connect(MapStateToProps)(Menu);
