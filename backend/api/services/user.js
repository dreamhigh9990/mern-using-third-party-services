const _ = require(`lodash`);
const mongoose = require('mongoose');
const BaseCrudService = require('./BaseCrudService');

const User = mongoose.model('User');
const Permission = mongoose.model('Permission');

class UserService extends BaseCrudService {
  constructor() {
    super('User', ['email', 'name', 'avatar'], ['role'], null, [
      {
        path: 'permissions',
        select: 'space role',
        populate: [
          {
            path: 'space',
            select: 'name description image slug'
          }
        ]
      }
    ]);

    this.changePassword = this.changePassword.bind(this);
  }

  create(user, data) {
    const createData = {};
    const Model = this.model;
    Object.assign(createData, _.pick(data, this.fields));
    createData.username = data.email;
    createData.verified = true;

    const newUser = new Model(createData);

    return new Promise((resolve, reject) => {
      User.register(newUser, data.password, (err, account) => {
        if (err) {
          reject(err);
        } else {
          resolve(account);
        }
      });
    });
  }

  changePassword(user, data) {
    return user.changePassword(data.oldPassword, data.newPassword);
  }

  remove(currentUser, user) {
    return Promise.all([Permission.deleteMany({ user: user._id })]).then(() =>
      super.remove(currentUser, user)
    );
  }
}

module.exports = new UserService();
