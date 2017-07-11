import React from 'react';
import PropTypes from 'prop-types';

const Menu = ({ auth }) => {
  return (
    <li>
      <a href="#a">asdf{auth}</a>
    </li>
  );
};

Menu.propTypes = {
  auth: PropTypes.number.isRequired,
};

export default Menu;
