const _ = require('lodash');
const BaseCrudService = require('./BaseCrudService');
const mailService = require('./mailer');

class CommentService extends BaseCrudService {
  constructor() {
    super(
      'Comment',
      ['content', 'post', 'replyTo', 'space'],
      [],
      'user',
      [
        { path: 'user', select: '_id name' },
        {
          path: 'space',
          select: 'name slug owner',
          populate: [
            {
              path: 'owner',
              select: 'email name'
            }
          ]
        }
      ],
      [{ path: 'user', select: '_id name' }]
    );
  }

  getUsersInThread(comment) {
    return this.model
      .find({
        $or: [
          {
            post: comment.post,
            replyTo: comment.replyTo
          },
          {
            post: comment.post,
            _id: comment.replyto
          }
        ]
      })
      .populate([
        {
          path: 'user',
          select: 'name email'
        }
      ]);
  }

  notifySameThread(id, currentUser) {
    return this.get(null, id).then(comment => {
      return this.getUsersInThread(comment).then(comments => {
        const usersToMail = _.uniqBy(
          [...comments.map(c => c.user), comment.space.owner].filter(
            u => u._id.toString() !== currentUser._id.toString()
          ),
          u => u._id.toString()
        );

        return mailService.newComment(comment, usersToMail);
      });
    });
  }

  create(user, data, { space }) {
    if (!data.replyTo) {
      return super
        .create(user, {
          ...data,
          space
        })
        .then(newComment => {
          this.notifySameThread(newComment._id, user);
          return newComment;
        });
    }

    return this.get(user, data.replyTo).then(replyComment => {
      return super.create(user, data).then(newComment => {
        replyComment.replies.push(newComment._id);
        return replyComment.save().then(() => {
          this.notifySameThread(newComment._id, user);
          return newComment;
        });
      });
    });
  }

  remove(user, comment) {
    if (comment.replies && comment.replies.length) {
      this.model.deleteMany({ relyTo: comment._id });
    }

    if (!comment.replyTo) {
      return super.remove(user, comment);
    }

    return this.get(user, comment.replyTo).then(replyComment => {
      replyComment.replies = replyComment.replies.filter(
        r => r._id.toString() !== comment._id.toString()
      );
      return replyComment.save().then(() => super.remove(user, comment));
    });
  }

  _listWhere(user, filters = {}) {
    if (_.has(filters, 'replyTo') && !filters.replyTo) {
      filters.replyTo = null;
    }

    return filters;
  }
}

module.exports = new CommentService();
