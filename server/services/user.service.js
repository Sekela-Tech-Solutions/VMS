const { userModel } = require('./../models');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const createUser = async (body) => {
    // Await the result of the isEmailTaken function
    const isTaken = await userModel.isEmailTaken(body.email);
    
    if (isTaken) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email is already taken');
    }
    
    const user = await userModel.create(body);
    return user;
};

const getUsers = async () => {
    const users = await userModel.find({});
    return users;
};

module.exports = {
    createUser,
    getUsers,
};
