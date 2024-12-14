require('dotenv').config();
const { envValidation } = require('../validations')

const { value: envVars, error } = envValidation.validate(process.env);

if (error) {
  console.error(`Config validation error: ${error.message}`);
}

module.exports = {
  port: envVars.PORT,
  dbConnection: envVars.DB_CONNECTION,
  env: envVars.NODE_ENV,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
  }
};
