const { userModel } = require('../models');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const bcrypt = require('bcrypt');

const signUp = async (body) => {
    const { password, email, ...otherDetails } = body;

    const isTaken = await userModel.isEmailTaken(email);
    if (isTaken) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email is already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({ email, password: hashedPassword, ...otherDetails });

    const userResponse = user.toObject();
    delete userResponse.password;

    return userResponse;
};


const signIn = async (body) => {

    const { email, password } = body; 
    const user = await userModel.findOne({ email });

    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
    }

    return user;
};

module.exports = {
    signUp,
    signIn,
};
