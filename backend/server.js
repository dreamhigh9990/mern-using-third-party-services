const express = require('express');
const Sentry = require('@sentry/node');
const sslRedirect = require('heroku-ssl-redirect');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const config = require('./api/config');
const initializeDB = require('./api/mongoose');

// initialize db on the top to have models available below
initializeDB();

const initializePassport = require('./api/passport');
const apiRouter = require('./api');

const server = express();

if (config.sentryDsn) {
  Sentry.init({
    dsn: config.sentryDsn
  });
  server.use(Sentry.Handlers.requestHandler());
}
server.use(sslRedirect());
server.use(helmet({ frameguard: false }));
server.use(compression());
server.use(
  bodyParser.json({
    limit: config.uploadLimit
  })
);
server.use(
  bodyParser.urlencoded({
    limit: config.uploadLimit,
    extended: false
  })
);
server.use(cors());

initializePassport(server);

server.use('/', apiRouter);

if (config.sentryDsn) {
  server.use(Sentry.Handlers.errorHandler());
}

// default error handler
// eslint-disable-next-line
server.use((err, req, res, next1) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message,
    stack: config.isDev ? err.stack : undefined
  });
});

server.listen(config.port, err => {
  if (err) throw err;
  console.log(`> Ready on ${config.host}`);
});
