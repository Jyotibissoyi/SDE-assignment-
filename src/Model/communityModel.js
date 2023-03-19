const mongoose = require('mongoose');
const { Snowflake } = require('@theinternetfolks/snowflake');

const CommunitySchema = new mongoose.Schema({

    id: {
        type: String,
        default: Snowflake.generate(),
        immutable: true,
        required: true,
    },

    name: { type: String },

    slug: { type: String, unique: true },

    owner: { type: String, ref: 'User' }

}, { timestamps: true });

module.exports = mongoose.model('Community', CommunitySchema);