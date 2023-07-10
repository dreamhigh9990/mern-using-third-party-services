const BaseCrudService = require('./BaseCrudService');
const SpaceService = require('./space');
const mailService = require('./mailer');
const POST_KINDS = require('../constants/post-kinds');

class PostService extends BaseCrudService {
  constructor() {
    super(
      'Post',
      ['kind', 'filename', 'uploadcareId', 'mimeType', 'fileUrl', 'space'],
      ['user'],
      'user',
      [{ path: 'user', select: '_id name' }],
      [{ path: 'user', select: '_id name' }]
    );
  }

  getKind(mimeType) {
    return mimeType.indexOf('video/') > -1
      ? POST_KINDS.VIDEO
      : POST_KINDS.IMAGE;
  }

  notifyPeopleInSpace(id, spaceId, currentUser) {
    return Promise.all([
      this.get(null, id),
      SpaceService.get(null, spaceId)
    ]).then(([post, space]) => {
      post.space = space;
      const users = space.permissions
        .map(p => p.user)
        .filter(u => u._id.toString() !== currentUser._id.toString());

      return mailService.newPost(post, users);
    });
  }

  create(user, data) {
    return super.create(user, data).then(post => {
      this.notifyPeopleInSpace(post._id, data.space, user);
      return post;
    });
  }
}

module.exports = new PostService();
