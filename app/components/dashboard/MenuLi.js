import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MenuLi = ({ menuItem, auth, location, depth }) => {
  if (menuItem.auth < auth.authority) {
    return null;
  }

  let show = menuItem.show === true;
  const current = ['', ''];
  console.log(menuItem.path === location.pathname, menuItem.path, location.pathname);

  if (menuItem.path === location.pathname) {
    show = true;
    current[0] = 'active';
    current[1] = <span className="sr-only">(current)</span>;
  }

  if (show === false) {
    return null;
  }
  const depthDashes = `${'\u2013'.repeat(depth)} `;
  const useA = menuItem.useA || false;
  const link = useA
    ? <a href={menuItem.path}>{depthDashes + menuItem.name}</a>
    : <Link to={menuItem.path}>{depthDashes + menuItem.name}</Link>;

  return (
    <li key={menuItem.path} className={current[0]}>{link} {current[1]}</li>
  );
};

MenuLi.propTypes = {
  auth: PropTypes.shape({
    authority: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
  menuItem: PropTypes.object.isRequired,
  depth: PropTypes.number.isRequired,
};

export default MenuLi;
