import passport_local from 'passport-local';
import User from '../models/user';
import bCrypt from 'bcryptjs';

const LocalStrategy = passport_local.Strategy;

const LoginStrategy = function(passport) {

   passport.use(
      'login', 
      new LocalStrategy(
         { passReqToCallback : true },
         
         function(req, username, password, done) {
            // check in mongo if a user with username exists or not
            User.findOne(
               { 'username' : username }, 
               function(err, user) {
                  // In case of any error, return using the done method
                  if (err) {
                     return done(err);
                  }
                  
                  // Username does not exist, log the error and redirect back
                  if (!user) {
                     console.log('User Not Found with username ' + username);
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


   const IsValidPassword = function(user, password) {
      return bCrypt.compareSync(password, user.password);
   }

};

export default LoginStrategy;