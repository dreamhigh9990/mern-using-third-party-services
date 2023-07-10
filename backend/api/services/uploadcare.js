const rp = require('request-promise');
const config = require('../config');

function request(url, method = 'GET', options) {
  return rp({
    method,
    headers: {
      Accept: 'application/vnd.uploadcare-v0.5+json',
      Authorization: `Uploadcare.Simple ${config.uploadcarePublicKey}:${config.uploadcarePrivateKey}`
    },
    uri: `https://api.uploadcare.com/${url}/`,
    json: true,
    ...options
  });
}

module.exports = {
  request
};
