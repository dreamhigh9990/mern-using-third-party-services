const express = require('express');
const spaceCtrl = require('../controllers/space.controller');
const {
  isLoggedin,
  isAdmin,
  isSpaceAdmin,
  isSpaceUser
} = require('../middlewares/api-protect');
const postRoutes = require('./post.routes');
const permissionRoutes = require('./permission.routes');
const invitationRoutes = require('./invitation.routes');
const commentRoutes = require('./comment.routes');

const router = express.Router();

router
  .route('/')
  .post(isLoggedin, spaceCtrl.create)
  .get(isLoggedin, isAdmin, spaceCtrl.listAll);

router
  .route('/:spaceId')
  .get(isLoggedin, isSpaceUser, spaceCtrl.read)
  .put(isLoggedin, isSpaceAdmin, spaceCtrl.update)
  .delete(isLoggedin, isSpaceAdmin, spaceCtrl.remove);

router.route('/:spaceId/light').get(spaceCtrl.readLight);
router.route('/:spaceId/join').post(isLoggedin, spaceCtrl.join);
router.route('/:spaceId/send-sms').post(isLoggedin, spaceCtrl.sendLink);

router.use('/:spaceId/posts', isLoggedin, isSpaceUser, postRoutes);
router.use('/:spaceId/comments', isLoggedin, isSpaceUser, commentRoutes);
router.use('/:spaceId/permissions', isLoggedin, isSpaceAdmin, permissionRoutes);
router.use('/:spaceId/invitations', isLoggedin, isSpaceAdmin, invitationRoutes);

router.param('spaceId', spaceCtrl.getByIdMiddleware);

module.exports = router;
