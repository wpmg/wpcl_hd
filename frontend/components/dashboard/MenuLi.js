import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MenuLi = ({ menuItem, auth, location, depth }) => {
  const linkList = [];
  const itemAuth = typeof menuItem.auth === 'undefined' ? 100 : menuItem.auth;
  const itemUseA = menuItem.useA || false;
  const current = ['', null];
  let hide = menuItem.hide === true;

  if (itemAuth < auth.authority) {
    return null;
  }

  if (menuItem.path === location.pathname) {
    hide = false;
    current[0] = 'active ';
    current[1] = <span className="sr-only">(current)</span>;
  }

  if (hide === true) {
    return null;
  }
  const depthDashes = `${'\u2013'.repeat(depth)} `;
  const link = (name, className) => {
    return itemUseA
      ? <a key={className} className={className} href={menuItem.path}>{depthDashes + name}</a>
      : <Link key={className} className={className} to={menuItem.path}>{depthDashes + name}</Link>;
  };

  if (typeof menuItem.nameXs === 'undefined') {
    linkList.push(link(menuItem.name, ''));
  } else {
    linkList.push(link(menuItem.nameXs, 'visible-xs'));
    linkList.push(link(menuItem.name, 'hidden-xs'));
  }

  return <li key={menuItem.path} className={current[0]}>{linkList} {current[1]}</li>;
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
