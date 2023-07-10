const BaseCrudController = require('./BaseCrudController');
const commentService = require('../services/comment');

class CommentController extends BaseCrudController {
  constructor() {
    super(commentService, 'comment');
  }

  create(req, res, next) {
    return this.dataService
      .create(req.user, req.body, { space: req.space })
      .then(item => res.json(item))
      .catch(next);
  }

  update(req, res, next) {
    return this.dataService
      .update(req.user, req.comment, {
        ...req.body,
        space: req.space._id
      })
      .then(item => res.json(item))
      .catch(next);
  }

  list(req, res, next) {
    return this.dataService
      .list(
        req.user,
        {
          ...req.query.filters,
          space: req.space._id
        },
        req.query.sorts,
        req.query.skip,
        req.query.limit,
        req.query.select
      )
      .then(items => res.json(items))
      .catch(next);
  }
}

module.exports = new CommentController();
