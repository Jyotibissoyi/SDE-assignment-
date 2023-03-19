const mongoose = require('mongoose');
const { Snowflake } = require('@theinternetfolks/snowflake');

const UserSchema = new mongoose.Schema({

    id: {
        type: String,
        default: Snowflake.generate(),
        immutable: true,
        required: true,
    },
    name: {
        type: String,
        default: null
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }

}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);