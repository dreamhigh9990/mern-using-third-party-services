const ROLES = require('../constants/roles');

class BaseService {
  _isAdmin(user) {
    return user && user.role === ROLES.ADMIN;
  }

  _isOwner(user, obj, fieldName) {
    return (
      user &&
      obj &&
      obj[fieldName || this.userIdField] &&
      obj[fieldName || this.userIdField].equals(user._id)
    );
  }
}

module.exports = BaseService;
