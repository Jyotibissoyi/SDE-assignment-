const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({

    id: {
        type: String
    },
    name: {
        type: String,
        unique: true,
        enum: ['Community Admin', 'Community Member', 'Community Moderator'],
        default: 'Community Member'
    },
    scopes: {
        type: String,
        default: "member-get"
    }
}, { timestamps: true });

module.exports = mongoose.model('Role', RoleSchema);