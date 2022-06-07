const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        first: {type: String, required: true},
        last: {type: String, required: true}
    },
    password: {type: String, required: true},
    login: {type: String, required: true},
    role: {type: String, default: 'user'}
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;