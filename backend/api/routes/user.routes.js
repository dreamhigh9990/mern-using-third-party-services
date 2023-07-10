const express = require('express');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();

router
  .route('/')
  .post(userCtrl.create)
  .get(userCtrl.list);

router
  .route('/:id')
  .get(userCtrl.read)
  .put(userCtrl.update)
  .delete(userCtrl.remove);

router.route('/:id/impersonate').get(userCtrl.impersonate);
router.route('/:id/avatar').get(userCtrl.uploadAvatar);

router.param('id', userCtrl.getByIdMiddleware);

module.exports = router;
