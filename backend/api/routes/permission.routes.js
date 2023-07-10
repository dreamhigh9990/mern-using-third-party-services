const express = require('express');
const permissionCtrl = require('../controllers/permission.controller');

const router = express.Router();

router
  .route('/')
  .post(permissionCtrl.create)
  .get(permissionCtrl.list);

router
  .route('/:id')
  .get(permissionCtrl.read)
  .put(permissionCtrl.update)
  .delete(permissionCtrl.remove);

router.param('id', permissionCtrl.getByIdMiddleware);

module.exports = router;
