const BaseCrudController = require('./BaseCrudController');
const postService = require('../services/post');
const uploadcareService = require('../services/uploadcare');
const config = require('../config');

class PostController extends BaseCrudController {
  constructor() {
    super(postService, 'post');
    this.batchCreate = this.batchCreate.bind(this);
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
      .update(req.user, req.post, {
        ...req.body,
        space: req.space._id
      })
      .then(item => res.json(item))
      .catch(next);
  }

  batchCreate(req, res, next) {
    return uploadcareService
      .request(`groups/${req.body.group_id}`)
      .then(ucGroup => {
        return Promise.all(
          ucGroup.files.map(file =>
            !file
              ? Promise.resolve()
              : this.dataService.create(req.user, {
                  // @TODO generate thumb
                  kind: this.dataService.getKind(file.mime_type),
                  space: req.space._id,
                  filename: file.original_filename,
                  mimeType: file.mime_type,
                  uploadcareId: file.uuid,
                  fileUrl: `${config.uploadcareCdnUrl}/${
                    file.uuid
                  }/${config.default_effects || ''}`
                })
          )
        );
      })
      .then(result => res.json(result))
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

module.exports = new PostController();
