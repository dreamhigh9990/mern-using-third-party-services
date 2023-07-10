const mongoose = require('mongoose');
const _ = require('lodash');
const BaseCrudController = require('./BaseCrudController');
const PermissionService = require('../services/permission');
const spaceService = require('../services/space');
const SPACE_PERMISSIONS = require('../constants/space-permissions');

class SpaceController extends BaseCrudController {
  constructor() {
    super(spaceService, 'space');
    this.sendLink = this.sendLink.bind(this);
    this.listAll = this.listAll.bind(this);
  }

  readLight(req, res) {
    res.json(
      _.pick(req.space, ['_id', 'slug', 'description', 'status', 'name'])
    );
  }

  join(req, res, next) {
    PermissionService.create(
      req.user,
      {
        role: SPACE_PERMISSIONS.MEMBER,
        user: req.user
      },
      { space: req.space }
    )
      .then(result => res.json(result))
      .catch(next);
  }

  sendLink(req, res, next) {
    return this.dataService
      .sendLink(req.user, req.space, req.body.phone)
      .then(() => res.json({ success: true }))
      .catch(next);
  }

  listAll(req, res, next) {
    return this.dataService
      .listAll(req.user)
      .then(result => res.json(result))
      .catch(next);
  }

  getByIdMiddleware(req, res, next, id) {
    let condition;

    if (mongoose.Types.ObjectId.isValid(id)) {
      condition = {
        _id: id
      };
    } else {
      condition = {
        slug: id
      };
    }

    this.dataService
      .getOne(req.user, condition)
      .then(item => {
        req[this.varName] = item;
        next();
      })
      .catch(next);
  }
}

module.exports = new SpaceController();
