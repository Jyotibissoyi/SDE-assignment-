const mongoose = require('mongoose');

const CommunitySchema = new mongoose.Schema({

    id: { type: String },

    name: { type: String },

    slug: { type: String, unique: true },

    owner: { type: String, ref: 'User' }

}, { timestamps: true });

module.exports = mongoose.model('Community', CommunitySchema);