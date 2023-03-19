const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    id: { type: String },

    name: { type: String, default: null },

    email: { type: String, unique: true },

    password: { type: String }

}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);