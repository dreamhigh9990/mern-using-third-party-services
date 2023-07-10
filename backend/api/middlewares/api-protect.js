const passport = require('passport');
const APIError = require('../utils/api-error');
const ROLES = require('../constants/roles');
const SPACE_PERMISSIONS = require('../constants/space-permissions');
const permUtils = require('../utils/permission');

const isLoggedin = passport.authenticate('jwt', { session: false });

const hasRole = role => (req, res, next) => {
  if ((req.user && req.user.role === role) || req.user.role === 'ADMIN') {
    next();
  } else {
    throw new APIError('You are forbidden to access this resource', 403);
  }
};

const hasSpaceAccess = permission => (req, res, next) => {
  if (permUtils.hasAccess(req.user, req.space, permission)) {
    next();
  } else {
    throw new APIError(
      `You do not have ${permission} access to this space`,
      403
    );
  }
};

const isAdmin = hasRole(ROLES.ADMIN);
const isUser = hasRole(ROLES.USER);
const isSpaceAdmin = hasSpaceAccess(SPACE_PERMISSIONS.OWNER);
const isSpaceUser = hasSpaceAccess(SPACE_PERMISSIONS.MEMBER);

module.exports = {
  isLoggedin,
  isAdmin,
  isUser,
  isSpaceAdmin,
  isSpaceUser,
  hasRole
};
