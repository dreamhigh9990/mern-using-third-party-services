const moment = require('moment');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/token');
const config = require('../config');
const APIError = require('../utils/api-error');
const BaseService = require('./BaseService');
const mailService = require('./mailer');

const User = mongoose.model('User');

class AuthService extends BaseService {
  constructor() {
    super();

    this.generateToken = this.generateToken.bind(this);
    this.requestResetPassword = this.requestResetPassword.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.sendVerificationEmail = this.sendVerificationEmail.bind(this);
    this.verifyEmailForUser = this.verifyEmailForUser.bind(this);
  }

  generateToken(user) {
    const data = user.toSafeJSON();

    delete data.notificationPreference;
    delete data.notificationSet;
    delete data.description;

    const token = jwt.sign(data, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn
    });

    return token;
  }

  requestResetPassword(email) {
    return User.findOne({
      email
    })
      .then(user => {
        if (!user) {
          throw new APIError('User not found', 404);
        }

        const token = generateToken(16);
        const expires = moment()
          .add(config.resetExpiresIn, 'hour')
          .toDate();

        user.resetToken = token;
        user.resetExpires = expires;

        return user.save();
      })
      .then(user => {
        return mailService.resetPassword(user);
      });
  }

  resetPassword(token, password) {
    return User.findOne({
      resetToken: token
    })
      .then(user => {
        if (!user) {
          throw new APIError('User not found', 404);
        }

        if (moment().isAfter(user.resetExpires)) {
          throw new APIError('Your reset token is expired', 400);
        }

        return user.setPassword(password);
      })
      .then(user => {
        user.resetToken = null;
        user.resetExpires = null;
        return user.save();
      });
  }

  sendVerificationEmail(email) {
    return User.findOne({
      email
    })
      .then(user => {
        if (!user) {
          throw new APIError('User not found', 404);
        }

        user.verificationToken = generateToken(16);
        return user.save();
      })
      .then(user => {
        return mailService.verification(user);
      });
  }

  verifyEmailForUser(token) {
    return User.findOne({
      verificationToken: token
    })
      .then(user => {
        if (!user) {
          throw new APIError('User not found', 404);
        }

        if (user.verified) {
          throw new APIError('User is already verified', 400);
        }

        user.verified = true;
        return user.save();
      })
      .then(user => {
        return mailService.welcome(user);
      });
  }
}

module.exports = new AuthService();
