const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

// User routes
// TODO: Add middleware authentication based on JWT token to ensure only admins can retrieve user data

// Get all users
router.get('/', UserController.getAllUsers);

// Get user by login
router.get('/user/login/:login', UserController.getUserByLogin);

// Get user by id
router.get('/user/id/:id', UserController.getUserById);

// Delete a user
router.delete('/user/id/:id', UserController.deleteUser);

module.exports = router;