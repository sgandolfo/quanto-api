const express = require('express');
const UserController = require('../controllers/userController');
const auth = require('../middleware/authenticate');
const User = require('../models/User');
const ac = require('../middleware/authorize');

const router = express.Router();

// User routes

// Get user by login
router.get('/user/login/:login', auth, UserController.getUserByLogin);

// Get user by id
router.get('/user/id/:id', auth, UserController.getUserById);

// Get all users
router.get('/', auth, ac('readAny', 'user'), UserController.getAllUsers);

// Delete a user
router.delete('/user/id/:id', auth, ac('deleteAny', 'user'), UserController.deleteUser);

module.exports = router;