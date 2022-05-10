const express = require('express');
const User = require('../models/User');

const router = express.Router();

// User routes

// Get all users
router.get('/', (req, res) => {
    User.find().sort({ createdAt: -1 })
    .then((result) => {
        res.send(result);
    })
    .catch(err => console.log(err));
});

// Create a new user
router.post('/', (req, res) => {
    console.log(req.body);

    const user = new User(req.body);

    user.save()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
})

module.exports = router;