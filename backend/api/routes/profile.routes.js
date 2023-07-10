const express = require('express');
const profileCtrl = require('../controllers/profile.controller');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();
router
  .route('/')
  .get(profileCtrl.getProfile)
  .put(profileCtrl.updateProfile);

router.route('/change-password').post(profileCtrl.changePassword);
router.route('/avatar').post(userCtrl.uploadAvatarForSelf);

module.exports = router;
