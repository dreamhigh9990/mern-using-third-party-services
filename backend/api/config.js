const dotenv = require('dotenv');
const path = require('path');

const isDev = process.env.NODE_ENV !== 'production';

if (isDev) {
  try {
    dotenv.config({
      path: path.resolve(process.cwd(), process.env.PROD ? '.env.prod' : '.env')
    });
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  host: process.env.HOST || 'https://rembrance.com',
  mongoURL: process.env.MONGODB_URI || 'mongodb://localhost:27017/memorial',
  uploadLimit: process.env.UPLOAD_LIMIT || '10mb',
  jwtSecret: process.env.JWT_SECRET || 'emilisawesome',
  jwtExpiresIn: process.env.JWT_EXPIRES || '30d',
  sendgridApiKey: process.env.SENDGRID_API_KEY,
  fromMailAddress: process.env.FROM_MAIL_ADDRESS || 'no-reply@rembrance.com',
  replyToMailAddress:
    process.env.REPLY_MAIL_ADDRESS || 'no-reply@rembrance.com',
  fromName: process.env.FROM_NAME || 'Rembrance',
  mailTemplates: {
    resetPassword:
      process.env.MAIL_RESET_PASSWORD || 'd-9c6cdd04da6247c0ae7250f38f76092a',
    welcome: process.env.MAIL_WELCOME || 'd-27b3de1a0e6f48a68666049c66b21216',
    verification:
      process.env.MAIL_VERIFICATION || 'd-5bbf3311e9c647fabe243a4ce5a20ccb',
    newComment:
      process.env.MAIL_NEW_COMMENT || 'd-405d38a5286d44c798c6a0a12083aa76',
    newPost: process.env.MAIL_NEW_POST || 'd-4071e801c4b146f396056f7ea1a43dd0'
  },
  resetExpiresIn: parseInt(process.env.RESET_EXPIRES_IN, 10) || 1, // hour
  isDev,
  port: parseInt(process.env.PORT, 10) || 3000,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  awsRegion: process.env.AWS_REGION || 'us-west-1',
  awsBucket: process.env.AWS_BUCKET || 'rembrance-dev',
  sentryDsn: process.env.SENTRY_DSN || '',
  uploadcareCdnUrl: process.env.UPLOADCARE_CDN_URL || 'https://ucarecdn.com',
  uploadcarePrivateKey: process.env.UPLOADCARE_PRIVATE_KEY || '',
  uploadcarePublicKey: process.env.UPLOADCARE_PUBLIC_KEY || '',
  twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
  twilioNumber: process.env.TWILIO_NUMBER
};
