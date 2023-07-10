const config = require('../config');
const Mailer = require('../utils/mailer');

function _sendMail({ to, template, vars, subject }) {
  return Mailer.sendTransactionMail({ to, template, vars, subject });
}

class MailerService {
  welcome(user) {
    return _sendMail({
      to: user.email,
      template: config.mailTemplates.welcome,
      vars: {
        name: user.name
      },
      options: {
        email: 'feedback@rembrance.com',
        name: 'Rembrance'
      }
    });
  }

  resetPassword(user) {
    return _sendMail({
      to: user.email,
      template: config.mailTemplates.resetPassword,
      vars: {
        name: user.name,
        resetUrl: `${config.host}/auth/reset-password?token=${user.resetToken}`
      }
    });
  }

  verification(user) {
    return _sendMail({
      to: user.email,
      template: config.mailTemplates.verification,
      vars: {
        name: user.name,
        verificationUrl: `${config.host}/auth/verify?token=${user.verificationToken}`
      }
    });
  }

  newPost(post, users) {
    const { space } = post;
    const img = `${post.fileUrl}-/scale_crop/350x350/center/`;

    return Promise.all(
      users.map(u =>
        _sendMail({
          user: u,
          to: u.email,
          template: config.mailTemplates.newPost,
          vars: {
            space: space.name,
            spaceUrl: `${config.host}/spaces/${space.slug}`,
            postUrl: `${config.host}/spaces/${space.slug}/posts/${post._id}`,
            preview: `<img src="${img}" />`,
            name: u.name,
            user: post.user.name
          }
        })
      )
    );
  }

  newComment(comment, users) {
    const { space, post } = comment;

    return Promise.all(
      users.map(u =>
        _sendMail({
          user: u,
          to: u.email,
          template: config.mailTemplates.newComment,
          vars: {
            space: space.name,
            spaceUrl: `${config.host}/spaces/${space.slug}`,
            commentUrl: `${config.host}/spaces/${space.slug}/posts/${post._id}`,
            comment: comment.content,
            user: u.name,
            name: comment.user.name
          }
        })
      )
    );
  }
}

module.exports = new MailerService();
