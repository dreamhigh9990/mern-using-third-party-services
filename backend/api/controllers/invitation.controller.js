const BaseCrudController = require('./BaseCrudController');
const invitationService = require('../services/invitation');

class InvitationController extends BaseCrudController {
  constructor() {
    super(invitationService, 'invitation');
  }

  create(req, res, next) {
    return this.dataService
      .create(req.user, req.body, { space: req.space })
      .then(item => res.json(item))
      .catch(next);
  }
}

module.exports = new InvitationController();
