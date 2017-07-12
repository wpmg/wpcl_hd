import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MenuUl from './MenuUl';
import { authToDegree } from './SignedInAs';

const Menu = ({ auth, location, type }) => {
  const menuGroups = (isNavbarMenu) => {
    if (isNavbarMenu) {
      return [[
        { name: 'Settings', path: '/dashboard/settings' },
        { name: 'Log out',
          nameXs: `Log out \u2013 signed in as ${auth.username} (${authToDegree(auth.authority)})`,
          path: '/logout',
          useA: true },
      ]];
    }

    return [
      [
        { name: 'Overview', path: '/dashboard', children: [
          { name: 'Disk #', path: '/dashboard/disk', hide: false },
        ] },
        { name: 'Attributes', path: '/dashboard/attributes' },
      ],
      [
        { name: 'Edit locations', path: '/dashboard/admin/locations', auth: 2 },
      ],
      [
        { name: 'Edit users', path: '/dashboard/admin/users', auth: 1 },
      ],
    ];
  };

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
