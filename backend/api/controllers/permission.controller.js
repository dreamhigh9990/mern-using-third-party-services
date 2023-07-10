const BaseCrudController = require('./BaseCrudController');
const permissionService = require('../services/permission');

class PermissionController extends BaseCrudController {
  constructor() {
    super(permissionService, 'permission');
  }

  create(req, res, next) {
    return this.dataService
      .create(req.user, {
        ...req.body,
        space: req.space._id
      })
      .then(item => res.json(item))
      .catch(next);
  }

  update(req, res, next) {
    return this.dataService
      .update(req.user, req.permission, {
        ...req.body,
        space: req.space._id
      })
      .then(item => res.json(item))
      .catch(next);
  }
}

module.exports = new PermissionController();
