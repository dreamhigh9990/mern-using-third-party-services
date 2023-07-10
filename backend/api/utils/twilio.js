const config = require('../config');
const client = require('twilio')(
  config.twilioAccountSid,
  config.twilioAuthToken
);

function sendSms(to, body) {
  return client.messages.create({
    from: config.twilioNumber,
    body,
    to
  });
}

module.exports = {
  sendSms
};
