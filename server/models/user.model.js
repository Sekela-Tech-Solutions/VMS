const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email");
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error(
                    'Password should contain at least one uppercase and lowercase letter, number, and special character'
                );
            }
        }
    },
}, {
    timestamps: true
});
 
userSchema.statics.isEmailTaken = async function (email) {
    const user = await this.findOne({ email }); 
    return !!user;
};

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
