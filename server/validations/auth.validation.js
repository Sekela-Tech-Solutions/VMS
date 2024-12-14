const joi = require('joi');

const signInSchema = joi.object({
    email: joi.string(),
    password: joi.string()
});

module.exports = {
    signInSchema,
};