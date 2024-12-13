const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { tokenTypes } = require('../config/token');

const generateAuthToken = (userId) => {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const expirationTime = currentTimestamp + (config.jwt.accessExpirationMinutes * 60);

  const payload = {
    sub: userId,
    iat: currentTimestamp,
    exp: expirationTime,
    type: tokenTypes.ACCESS,
  };

  return jwt.sign(payload, config.jwt.secret);
};

module.exports = {generateAuthToken};
