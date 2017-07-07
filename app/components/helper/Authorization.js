import React from 'react';

const Authorization = (allowed_roles) => {
  (Allowed_Component, Disallowed_Component) => {
    return class With_Authorization extends React.Component {
      constructor(props) {
        super(props);

        // In this case the user is hardcoded, but it could be loaded from anywhere.
        // Redux, MobX, RxJS, Backbone...
        this.state = {
          user: {
            name: 'vcarl',
            role: 'admin'
          }
        }
      }

      render() {
        const { role } = this.state.user;
        
        if (allowed_roles.includes(role)) {
          return <Allowed_Component {...this.props} />
        }

        if (Disallowed_Component !== 'undefined') {
          return <Disallowed_Component {...this.props} />
        }

      }
    }
  }
}

export default Authorization;