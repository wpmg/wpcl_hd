import React from 'react';

const Authorization = (allowedRoles) => {
  return (AllowedComponent, DisallowedComponent) => {
    return class WithAuthorization extends React.Component {
      constructor(props) {
        super(props);

        // In this case the user is hardcoded, but it could be loaded from anywhere.
        // Redux, MobX, RxJS, Backbone...
        this.state = {
          user: {
            name: 'vcarl',
            role: 'admin',
          },
        };
      }

      render() {
        const { role } = this.state.user;

        if (allowedRoles.includes(role)) {
          return <AllowedComponent {...this.props} />;
        }

        if (DisallowedComponent !== 'undefined') {
          return <DisallowedComponent {...this.props} />;
        }

        return null;
      }
    };
  };
};

export default Authorization;
