const ROLES = require('../constants/roles');
const SPACE_PERMISSIONS = require('../constants/space-permissions');

function isAdmin(user) {
  return user && user.role === ROLES.ADMIN;
}

function hasAccess(user, space, permission) {
  if (!user || !space) {
    return false;
  }

  const perm = user.permissions.find(g =>
    g.space._id.equals
      ? g.space._id.equals(space._id)
      : g.space._id === space._id.toString()
  );

  if (
    perm &&
    (perm.role === permission || perm.role === SPACE_PERMISSIONS.OWNER)
  ) {
    return true;
  }

  return false;
}

function isSpaceOwner(user, space) {
  return hasAccess(user, space, SPACE_PERMISSIONS.OWNER);
}

function isSpaceMember(user, space) {
  return hasAccess(user, space, SPACE_PERMISSIONS.MEMBER);
}

module.exports = {
  hasAccess,
  isAdmin,
  isSpaceOwner,
  isSpaceMember
};
