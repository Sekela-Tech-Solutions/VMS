const catchAsync = require('../utils/catchAsync');
const { userService } = require('./../services');
const tokenService = require("./../services/token.service");

const httpStatus = require('http-status');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const token = tokenService.generateAuthToken(user._id);
  
  res
    .status(httpStatus.CREATED)
    .send({ success: true, message: 'User created successfully', data: user, token });
});

const getUsers = catchAsync(async (req, res) => {
  const users = await userService.getUsers();
  res
    .status(httpStatus.OK)
    .json(users);
});

module.exports = {
  createUser,
  getUsers,
};
