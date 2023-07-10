const express = require('express');
const postCtrl = require('../controllers/post.controller');

const router = express.Router();

router
  .route('/')
  .post(postCtrl.create)
  .get(postCtrl.list);

router.route('/batch-create').post(postCtrl.batchCreate);

router
  .route('/:id')
  .get(postCtrl.read)
  .put(postCtrl.checkOwnerMiddleware, postCtrl.update)
  .delete(postCtrl.checkOwnerMiddleware, postCtrl.remove);

router.param('id', postCtrl.getByIdMiddleware);

module.exports = router;
