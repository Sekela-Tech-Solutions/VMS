const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const logger = require('./logger');

// Morgan custom token to capture error messages from locals
morgan.token('message', (req, res) => res.locals.errorMessage || '');

// Determine IP format based on environment
const getIPFormat = () => (config.env === 'production' ? ':remote-addr - ' : '');

// Define log formats for success and error cases
const successResponseFormat = `${getIPFormat()}:method :url :status :response-time ms :user-agent :date`;
const errorResponseFormat = `${getIPFormat()}:method :url :status :response-time ms :user-agent :date - error-message: :message`;

// Create write stream for logging to file
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '..', 'logs/access.log'),
  { flags: 'a' }
);

// Morgan success handler (logs successful requests)
const successHandler = morgan(successResponseFormat, {
  stream: accessLogStream,
  skip: (req, res) => res.statusCode >= 400, // Skip if status code is >= 400 (errors)
  // Log success to Winston as well
  stream: {
    write: (message) => logger.info(message.trim())
  },
});

// Morgan error handler (logs error requests)
const errorHandler = morgan(errorResponseFormat, {
  stream: accessLogStream,
  skip: (req, res) => res.statusCode < 400, // Skip if status code is < 400 (non-errors)

  stream: {
    write: (message) => logger.error(message.trim())
  },
});

module.exports = { successHandler, errorHandler };
