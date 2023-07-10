const mongoose = require('mongoose');
const BaseCrudService = require('./BaseCrudService');

const User = mongoose.model('User');
const Space = mongoose.model('Space');

class PermissionService extends BaseCrudService {
  constructor() {
    super(
      'Permission',
      ['space', 'user', 'role'],
      ['space'],
      null,
      ['user', 'space'],
      ['user', 'space']
    );
  }

  create(user, data, { space }) {
    return super
      .create(user, {
        ...data,
        space
      })
      .then(permission => {
        return Promise.all([
          User.findByIdAndUpdate(permission.user, {
            $addToSet: {
              permissions: permission._id
            }
          }),
          Space.findByIdAndUpdate(permission.space, {
            $addToSet: {
              permissions: permission._id
            }
          })
        ]);
      });
  }

  remove(user, permission) {
    return Promise.all([
      User.findByIdAndUpdate(permission.user, {
        $pull: {
          permissions: permission._id
        }
      }),
      Space.findByIdAndUpdate(permission.space, {
        $pull: {
          permissions: permission._id
        }
      })
    ]).then(() => super.remove(user, permission));
  }
}

module.exports = new PermissionService();
