const BaseCrudController = require('./BaseCrudController');
const userService = require('../services/user');
const authService = require('../services/auth');
const getUploader = require('../utils/s3');

class UserController extends BaseCrudController {
  constructor() {
    super(userService, 'queryUser');
    this.uploadAvatar = this.uploadAvatar.bind(this);
    this.uploadAvatarForSelf = this.uploadAvatarForSelf.bind(this);
    this.impersonate = this.impersonate.bind(this);
  }

  _uploadAvatar(req, res, next, user) {
    const singleUpload = getUploader(
      'public-read',
      (_1, _2, cb) =>
        cb(null, {
          'Content-Type': 'image/jpeg'
        }),
      (_1, _2, cb) => {
        cb(null, `${user._id.toString()}.jpg`);
      }
    ).single('image');

    singleUpload(req, res, err => {
      if (err) {
        return next(err);
      }

      return userService
        .update(user, { avatar: req.file.location })
        .then(u => res.json(u))
        .catch(next);
    });
  }

  uploadAvatarForSelf(req, res, next) {
    this._uploadAvatar(req, res, next, req.user);
  }

  uploadAvatar(req, res, next) {
    this._uploadAvatar(req, res, next, req.queryUser);
  }

  impersonate(req, res) {
    const token = authService.generateToken(req.queryUser);

    res.json({
      user: req.queryUser.toSafeJSON(),
      token
    });
  }
}

module.exports = new UserController();
