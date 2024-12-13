const joi = require('joi');
const { password } = require('./custom.validation');

const createUserSchema = {
    body: joi.object().keys({
        fullName: joi.string().required(),
        email: joi.string().required(),
        password: joi.custom(password).required(),
    })
}

module.exports = {
    createUserSchema
}
