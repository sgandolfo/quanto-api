const express = require('express');
const AuthController = require('../controllers/authController');

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/changepassword',AuthController.changePassword);
router.post('/resetpassword', AuthController.resetPassword);

module.exports = router;