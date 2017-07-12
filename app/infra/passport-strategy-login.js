import passportLocal from 'passport-local';
import bCrypt from 'bcryptjs';

import User from '../models/user';

const LocalStrategy = passportLocal.Strategy;

const LoginStrategy = (passport) => {
  const IsValidPassword = (user, password) => {
    return bCrypt.compareSync(password, user.password);
  };

  passport.use(
    'login',
    new LocalStrategy(
      { passReqToCallback: true },

      (req, username, password, done) => {
        // check in mongo if a user with username exists or not
        User.findOne(
          { username }, // username: username
          (err, user) => {
            // In case of any error, return using the done method
            if (err) {
              return done(err);
            }

            // Username does not exist, log the error and redirect back
            if (!user) {
              console.log(`'User not found with username ${username}`);
              return done(null, false);
            }
            // User exists but wrong password, log the error
            if (!IsValidPassword(user, password)) {
              console.log('Invalid Password');
              return done(null, false);
            }

            // User and password both match, return user from done method
            // which will be treated like success
            return done(null, user);
          }
        );
      }
    )
  );
};

export default LoginStrategy;
