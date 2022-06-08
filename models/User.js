const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String},
    password: {type: String},
    role: {type: String, default: 'user'}
}, {timestamps: true});

userSchema.plugin(passportLocalMongoose, {limitAttempts: true, maxAttempts: 3});

const User = mongoose.model('User', userSchema);

module.exports = User;