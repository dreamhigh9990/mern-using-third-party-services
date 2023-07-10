const passport = require('passport');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const mongoose = require('mongoose');
const config = require('../config');
const APIError = require('../utils/api-error');
const authService = require('../services/auth');
const userService = require('../services/user');
const spaceService = require('../services/space');
const mailService = require('../services/mailer');

const User = mongoose.model('User');

class AuthController {
  constructor() {
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.requestResetPassword = this.requestResetPassword.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.sendVerificationEmail = this.sendVerificationEmail.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
  }

  _login(req, user) {
    return new Promise((resolve, reject) => {
      req.login(user, { session: false }, err => {
        if (err) {
          return reject(err);
        }

        if (!user.active) {
          return reject(new APIError('Your account is deactivated', 401));
        }

        const token = jwt.sign(user.toSafeJSON(), config.jwtSecret, {
          expiresIn: config.jwtExpiresIn
        });

        return resolve(token);
      });
    });
  }

  login(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new APIError('Email or password can not be empty', 401));
    }

    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
        console.error(info);
        return next(err || new APIError('Email or password is wrong', 401));
      }

      this._login(req, user)
        .then(token => {
          res.json({
            user: user.toSafeJSON(),
            token
          });
        })
        .catch(next);
    })(req, res);
  }

  register(req, res, next) {
    const data = _.pick(req.body, userService.fields);
    const { email, password } = req.body;

    data.username = email;
    const user = new User(data);

    User.register(user, password, (err, newUser) => {
      if (err) {
        err.status = 400;
        return next(err);
      }

      return this._login(req, newUser)
        .then(token => {
          mailService.welcome(newUser);
          // return authService.sendVerificationEmail(email).then(() => {
          res.json({
            user: newUser.toSafeJSON(),
            token
          });
          // });
        })
        .catch(next);
    });
  }

  requestResetPassword(req, res, next) {
    authService
      .requestResetPassword(req.body.email)
      .then(() => {
        res.json({ success: true });
      })
      .catch(next);
  }

  resetPassword(req, res, next) {
    const { token, password } = req.body;
    authService
      .resetPassword(token, password)
      .then(() => {
        res.json({ success: true });
      })
      .catch(next);
  }

  sendVerificationEmail(req, res, next) {
    const { email } = req.body;
    return authService
      .sendVerificationEmail(email)
      .then(() => {
        res.json({ success: true });
      })
      .catch(err => next(err));
  }

  verifyEmail(req, res, next) {
    const { token } = req.body;
    return authService
      .verifyEmailForUser(token)
      .then(() => {
        res.json({ success: true });
      })
      .catch(e => next(e));
  }

  checkEmail(req, res, next) {
    userService
      .getOne(null, { email: req.body.email })
      .then(() => res.json({ success: true }))
      .catch(err => next(err));
  }

  checkSpaceSlug(req, res, next) {
    spaceService
      .getOne(null, { slug: req.body.slug })
      .then(() => res.json({ success: true }))
      .catch(err => next(err));
  }
}

module.exports = new AuthController();
