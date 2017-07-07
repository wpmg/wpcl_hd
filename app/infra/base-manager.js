import nconf from 'nconf';

const baseManager = {
    handle(app, ...args) {
        this.configureCommon(app, ...args);

        if(nconf.get('development')) {
            this.configureDevelopmentEnv(app, ...args);
        } else {
            this.configureProductionEnv(app, ...args);
        }
    },

    configureCommon(/*app, ...args*/) {},

    configureProductionEnv(/*app, ...args*/) {},

    configureDevelopmentEnv(/*app, ...args*/) {}    
};

export default baseManager;
