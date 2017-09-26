import React from 'react';
import PropTypes from 'prop-types';

import MenuLi from './MenuLi';

const MenuChildComponent = (component, depth) => {
  const childArray = [
    <MenuLi
      key={component.menuItem.path}
      menuItem={component.menuItem}
      auth={component.auth}
      location={component.location}
      depth={depth}
    />,
  ];

  if (Object.prototype.hasOwnProperty.call(component.menuItem, 'children')) {
    const childrenLength = component.menuItem.children.length;

    for (let i = 0; i < childrenLength; i++) {
      childArray.push(...MenuChildComponent({
        auth: component.auth,
        location: component.location,
        menuItem: component.menuItem.children[i],
      }, depth + 1));
    }
  }

  return childArray;
};

const MenuUl = ({ auth, location, type, menuGroup }) => {
  let htmlClass = '';

  switch (type) {
    case 'navbar':
      htmlClass = 'navbar-nav ml-auto';
      break;
    case 'collapsable':
      htmlClass = 'navbar-nav d-md-none';
      break;
    default:
      htmlClass = 'nav-sidebar';
  }

  const menuItems = [];
  const menuGroupLength = menuGroup.length;

  for (let i = 0; i < menuGroupLength; i++) {
    menuItems.push(...MenuChildComponent({
      auth,
      location,
      menuItem: menuGroup[i],
    }, 0));
  }

  if (menuItems.length > 0) {
    return (
      <ul className={htmlClass}>
        {menuItems}
      </ul>
    );
  }

  return null;
};

MenuUl.propTypes = {
  auth: PropTypes.shape({
    authority: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  menuGroup: PropTypes.array.isRequired,
};

export default MenuUl;
