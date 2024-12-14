const mongoose = require('mongoose');
const http = require('http');
const config = require('./config/config');
const app = require('./server');
const logger = require('./config/logger');

mongoose
  .connect(config.dbConnection)
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch((err) => {
    console.error(err);
  });

const httpServer = http.createServer(app);

const server = httpServer.listen(config.port, () => {
  logger.info(`Server started on http://localhost:${config.port}`);
  logger.info(`Docs started on http://localhost:${config.port}/docs`);
  logger.info(`wait for DB connection ...`);

});

process.on('uncaughtException', (error) => {
  // logger.error('Uncaught Exception:', error);
  // exitHandler();
});

process.on('unhandledRejection', (reason, promise) => {
  // logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // exitHandler();
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(0);
    });
  }
});
