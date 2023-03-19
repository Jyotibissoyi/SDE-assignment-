const mongoose = require('mongoose');
const { Snowflake } = require('@theinternetfolks/snowflake');

const RoleSchema = new mongoose.Schema({

    id: {
        type: String,
        default: Snowflake.generate(),
        immutable: true,
        required: true,
    },
    name: {
        type: String,
        unique: true,
        enum: ['Community Admin', 'Community Member', 'Community Moderator']
    },
    scopes: {
        type: []
    }
}, { timestamps: true });

module.exports = mongoose.model('Role', RoleSchema);