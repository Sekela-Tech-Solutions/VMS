const winston = require('winston');
const { format, createLogger, transports } = winston;
const { combine, timestamp, printf, colorize, errors } = format;

// Define custom format for logs
const winstonFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp}: ${level}: ${stack || message}`;
});

// Create Winston logger
const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(
    timestamp(), // Add timestamp
    errors({ stack: true }), // Include stack trace for errors
    process.env.NODE_ENV === 'production' ? winstonFormat : combine(colorize(), winstonFormat)
  ),
  transports: [
    new transports.Console(), // Log to console
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Log errors to file
    new transports.File({ filename: 'logs/combined.log' }) // Log all to a combined file
  ],
});

module.exports = logger;
