const express = require('express');
const commentCtrl = require('../controllers/comment.controller');

const router = express.Router();

router
  .route('/')
  .post(commentCtrl.create)
  .get(commentCtrl.list);

router
  .route('/:id')
  .get(commentCtrl.read)
  .put(commentCtrl.checkOwnerMiddleware, commentCtrl.update)
  .delete(commentCtrl.checkOwnerMiddleware, commentCtrl.remove);

router.param('id', commentCtrl.getByIdMiddleware);

module.exports = router;
