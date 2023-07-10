const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('../config');

aws.config.update({
  secretAccessKey: config.awsSecretAccessKey,
  accessKeyId: config.accessKeyId,
  region: config.awsRegion
});

const s3 = new aws.S3();

function getUploader(acl = 'public-read', metadata, key) {
  return multer({
    storage: multerS3({
      s3,
      bucket: config.awsBucket,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl,
      metadata,
      key
    })
  });
}

module.exports = getUploader;
