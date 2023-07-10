const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const mongoose = require('mongoose');
const APIError = require('./utils/api-error');
const config = require('./config');

const User = mongoose.model('User');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

/**
 *
 * @param {Express} app
 */
const initializePassport = app => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      User.authenticate()
    )
  );

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwtSecret
      },
      (jwtPayload, cb) => {
        return User.findById(jwtPayload._id)
          .populate([
            {
              path: 'permissions',
              select: 'space role',
              populate: [
                {
                  path: 'space',
                  select: 'name slug image description'
                }
              ]
            }
          ])
          .then(user => {
            if (!user) {
              throw new APIError('You are not authorized', 401);
            }

            if (!user.active) {
              throw new APIError('Your account is deactivated', 401);
            }

            cb(null, user);
          })
          .catch(err => cb(err));
      }
    )
  );

  app.use(passport.initialize());
};

module.exports = initializePassport;
