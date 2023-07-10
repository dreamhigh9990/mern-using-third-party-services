const mongoose = require('mongoose');
const userService = require('../services/user');
const APIError = require('../utils/api-error');

const User = mongoose.model('User');

class ProfileController {
  getProfile(req, res) {
    res.send(req.user);
  }

  updateProfile(req, res, next) {
    userService
      .update(req.user, req.user, req.body)
      .then(user => res.json(user))
      .catch(next);
  }

  changePassword(req, res, next) {
    User.findById(req.user.id)
      .then(user => {
        if (!user) {
          throw new APIError('User not found', 404);
        }

        return userService.changePassword(user, req.body);
      })
      .then(() => res.json({ success: true }))
      .catch(next);
  }
}

module.exports = new ProfileController();
