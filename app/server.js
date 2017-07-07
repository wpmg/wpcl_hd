import express from 'express';
import nconf from 'nconf';
import passport from 'passport';
import mongoose from 'mongoose';

import db_config from './sensitive/db';
const db_configuration = db_config('rw');

import configManager from './infra/config-manager';
import passportManager from './infra/passport-manager';
import middlewareManager from './infra/middleware-manager';
import routeManager from './infra/route-manager';
import assetsManager from './infra/assets-manager';

const app = express();

mongoose.connect(
   db_configuration.uri,
   db_configuration.opts
);

configManager.handle(app);
passportManager.handle(app, passport, mongoose);

middlewareManager.handle(app);
assetsManager.handle(app);
routeManager.handle(app, passport);

app.listen(nconf.get('port'), () => {
    console.log('Listening on http://' + nconf.get('host') + ':' + nconf.get('port'));    
});
