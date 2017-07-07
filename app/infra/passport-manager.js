import session from 'express-session';
import session_store from 'connect-mongo';

import nconf from 'nconf';
import baseManager from './base-manager';

const MongoStore = session_store(session);

import User from '../models/user';
import LoginStrategy from './passport-strategy-login';

const passportManager = Object.assign({}, baseManager, {
   configureDevelopmentEnv(app, ...args) {
      const passport = args[0];
      const mongoose = args[1];

      app.use(session({
         secret: nconf.get('session').secret,
         store: new MongoStore({
            mongooseConnection: mongoose.connection,
            db: 'sessions'
         }),
         resave: false,
         saveUninitialized: false,
         cookie: {
            maxAge: 1000 * 60 * 30,
            httpOnly: true
         }
      }));
      
      app.use(passport.initialize());
      app.use(passport.session());

      passport.serializeUser(function(user, done) {
        done(null, user._id);
      });

      passport.deserializeUser(function(id, done) {
         User.findById(id, function(err, user) {
            done(err, {
               '_id': user._id,
               'username': user.username,
               'authority': user.authority
            });
         });
      });

      //Set up Login strategy
      LoginStrategy(passport);
   }
});

export default passportManager;