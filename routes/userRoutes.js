const express = require('express');
const User = require('../models/User');
const UserController = require('../controllers/userController');

const router = express.Router();

// User routes

// Get all users
router.get('/', UserController.getAllUsers);

// Get user by login
router.get('/user/login/:login', UserController.getUserByLogin);

// Get user by id
router.get('/user/id/:id', UserController.getUserById);

// Create a new user
router.post('/', UserController.createUser);

// Update a user
router.put('/user/id/:id', UserController.updateUser);

module.exports = router;