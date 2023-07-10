const sgMail = require('@sendgrid/mail');
const config = require('../config');

sgMail.setApiKey(config.sendgridApiKey);

function sendTransactionMail({ to, subject, template, vars, options }) {
  console.log(to, vars);

  return sgMail.send({
    to,
    templateId: template,
    from: {
      email: config.fromMailAddress,
      name: config.fromName
    },
    replyTo: config.replyToMailAddress,
    subject,
    dynamic_template_data: vars,
    ...options
  });
}

module.exports = {
  sendTransactionMail
};
