const express = require('express');
const invitationCtrl = require('../controllers/invitation.controller');

const router = express.Router();

router
  .route('/')
  .post(invitationCtrl.create)
  .get(invitationCtrl.list);

router
  .route('/:id')
  .get(invitationCtrl.read)
  .delete(invitationCtrl.remove);

router.param('id', invitationCtrl.getByIdMiddleware);

module.exports = router;
