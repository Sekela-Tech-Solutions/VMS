const mongoose = require('mongoose');
const { token } = require('../config');

const tokenSchema = mongoose.Schema({
    token: {
        type: String,
        require: true,
        index: true,
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: [token.tokenTypes.ACCESS, token.tokenTypes.REFRESH]
    },
    expires: {
        type: Date,
        required: true,
    },
    blacklisted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
})

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;