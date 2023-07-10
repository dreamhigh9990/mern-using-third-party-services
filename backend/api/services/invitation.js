const mongoose = require('mongoose');
const shortid = require('shortid');
const BaseCrudService = require('./BaseCrudService');

const Space = mongoose.model('Space');

class InvitationService extends BaseCrudService {
  constructor() {
    super(
      'Invitation',
      ['space', 'email', 'phone', 'permission', 'invitationToken'],
      ['space'],
      null,
      ['space'],
      ['space']
    );
  }

  create(user, data, { space }) {
    const invitationToken = shortid.generate();
    return super
      .create(user, {
        ...data,
        space,
        invitationToken
      })
      .then(invitation => {
        return Space.findByIdAndUpdate(invitation.space, {
          $addToSet: {
            invitations: invitation._id
          }
        });
      });
  }

  remove(user, invitation) {
    return Space.findByIdAndUpdate(invitation.space, {
      $pull: {
        invitations: invitation._id
      }
    }).then(() => super.remove(user, invitation));
  }
}

module.exports = new InvitationService();
