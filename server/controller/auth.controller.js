const catchAsync = require('../utils/catchAsync');
const { authService } = require('./../services');
const tokenService = require("./../services/token.service");

const httpStatus = require('http-status');

const signUp = catchAsync(async (req, res) => {
  const user = await authService.signUp(req.body);
  
  res
    .status(httpStatus.CREATED)
    .send({ success: true, message: 'User created successfully', data: user });
});

const signIn = catchAsync(async (req, res) => {

  const user = await authService.signIn(req.body);
  const token = tokenService.generateAuthToken(user._id);

  res
      .status(httpStatus.OK)
      .send({ success: true, message: 'Sign-in successful', token, data: user });
});

module.exports = {
  signUp,
  signIn,
};
