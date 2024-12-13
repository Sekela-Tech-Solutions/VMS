const validator = require('validator');
const password = (value, helpers) => {
    if (!validator.isStrongPassword(value)) {
        return helpers.message(
            'password should be atleast 8 chars with 1 uppercase and lowercase letter, number and special chars.'
        )
    }
    return value;
}

module.exports = { password };