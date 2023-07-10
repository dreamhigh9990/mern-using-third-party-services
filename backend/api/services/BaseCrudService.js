const _ = require('lodash');
const mongoose = require('mongoose');
const APIError = require('../utils/api-error');
const BaseService = require('./BaseService');

class BaseCrudService extends BaseService {
  constructor(
    modelName,
    safeFields = [],
    adminFields = [],
    userIdField = null,
    populateFields = [],
    listPopulateFields = []
  ) {
    super();

    this.modelName = modelName;
    this.safeFields = [...safeFields];
    this.fields = [...safeFields];
    this.adminFields = [...adminFields];
    this.userIdField = userIdField;
    this.populateFields = [...populateFields];
    this.listPopulateFields = [...listPopulateFields];
    this.model = mongoose.model(this.modelName);

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.get = this.get.bind(this);
    this.list = this.list.bind(this);
    this.remove = this.remove.bind(this);
    this.removeById = this.removeById.bind(this);
    this.removeMany = this.removeMany.bind(this);
    this.getOne = this.getOne.bind(this);
  }

  _getFieldNames(user) {
    if (this._isAdmin(user)) {
      return [...this.safeFields, ...this.adminFields];
    }

    return [...this.safeFields];
  }

  create(user, data) {
    const Model = this.model;
    const createData = {};
    const fields = this._getFieldNames(user);

    if (this.userIdField) {
      createData[this.userIdField] = user._id;
    }

    Object.assign(createData, _.pick(data, fields));

    const item = new Model(createData);

    return item.save();
  }

  update(user, item, data) {
    const fields = this._getFieldNames(user);
    const updateData = _.pick(data, fields);

    Object.assign(item, updateData);

    return item.save();
  }

  remove(user, item) {
    return item.delete();
  }

  removeById(user, id) {
    const Model = this.model;

    return Model.deleteOne({ _id: id });
  }

  removeMany(user, condition) {
    return this.model
      .find(condition)
      .then(items => Promise.all(items.map(p => this.remove(user, p))));
  }

  get(user, id) {
    const Model = this.model;
    let query = Model.findById(id);

    this.populateFields.forEach(field => {
      query = query.populate(field);
    });

    return query.then(item => {
      if (!item) throw new APIError('Not found', 404);

      return item;
    });
  }

  getOne(user, filter = {}, options = {}) {
    const Model = this.model;
    let query = Model.findOne(filter);

    this.populateFields.forEach(field => {
      query = query.populate(field);
    });

    if (options.populateFields) {
      query = query.populate(options.populateFields);
    }

    return query.then(item => {
      if (!item) throw new APIError('Not found', 404);

      return item;
    });
  }

  // basic filter to override
  _listWhere(user, filters = {}) {
    return filters;
  }

  _listSort(user, sorts) {
    if (!sorts.length) {
      sorts.unshift('createdAt desc');
    }

    return sorts.map(s => s.split(' '));
  }

  list(user, filters, sorts, skip, limit, select = '-_v') {
    const Model = this.model;

    const where = this._listWhere(user, filters || {});
    const sort = this._listSort(user, sorts || []);

    return Promise.all([
      Model.find(where)
        .collation({ locale: 'en' })
        .populate(this.listPopulateFields)
        .select(select)
        .sort(sort)
        .skip(skip * 1 || 0)
        .limit(limit * 1 || 20)
        .lean(),
      Model.count(where)
    ]).then(results => {
      const [items, total] = results;

      return {
        skip: skip * 1 || 0,
        limit: limit * 1 || 20,
        total,
        data: items
      };
    });
  }
}

module.exports = BaseCrudService;
