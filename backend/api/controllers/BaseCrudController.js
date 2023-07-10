const APIError = require('../utils/api-error');
const { isSpaceOwner } = require('../utils/permission');

class BaseCrudController {
  constructor(dataService, varName) {
    if (!dataService) {
      throw new Error('Data service not found', 500);
    }

    this.varName = varName;
    this.dataService = dataService;

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.read = this.read.bind(this);
    this.remove = this.remove.bind(this);
    this.list = this.list.bind(this);
    this.checkOwnerMiddleware = this.checkOwnerMiddleware.bind(this);
    this.getByIdMiddleware = this.getByIdMiddleware.bind(this);
  }

  checkOwnerMiddleware(req, res, next) {
    const item = req[this.varName];

    if (
      this.dataService._isAdmin(req.user) ||
      isSpaceOwner(req.user, req.space) ||
      this.dataService._isOwner(req.user, item)
    ) {
      return next();
    }

    return next(new APIError('You are forbidden to do this action', 403));
  }

  create(req, res, next) {
    return this.dataService
      .create(req.user, req.body)
      .then(item => res.json(item))
      .catch(next);
  }

  update(req, res, next) {
    return this.dataService
      .update(req.user, req[this.varName], req.body)
      .then(item => res.json(item))
      .catch(next);
  }

  read(req, res) {
    res.json(req[this.varName]);
  }

  remove(req, res, next) {
    return this.dataService
      .remove(req.user, req[this.varName])
      .then(() => res.json({ success: true }))
      .catch(next);
  }

  list(req, res, next) {
    return this.dataService
      .list(
        req.user,
        req.query.filters,
        req.query.sorts,
        req.query.skip,
        req.query.limit,
        req.query.select
      )
      .then(items => res.json(items))
      .catch(next);
  }

  getByIdMiddleware(req, res, next, id) {
    this.dataService
      .get(req.user, id)
      .then(item => {
        req[this.varName] = item;
        next();
      })
      .catch(next);
  }
}

module.exports = BaseCrudController;
