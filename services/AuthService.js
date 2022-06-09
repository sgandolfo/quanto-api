const User = require('../models/User'); //User Model
const passport = require('passport');
const jwt = require('jsonwebtoken'); //JWT Encoder and decoder
const config = require('../config/config'); //config

class AuthService {

    constructor () {
        
    }

    /**
   * @description Attempt to create a new user
   * @param userToCreate {Object} Object containing the user to be created
   * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
   */
    async register (userToCreate) {

            try {
                const user = new User({username: userToCreate.username, role: userToCreate.role});

                await User.register(user, userToCreate.password);

                return {success: true, body: "Your account has been created"};

            } catch (error) {
                return { success: false, body: "Your account could not be saved. Error: ", err };
            }
    };

    /**
   * @description Attempt to login a user with his/her credentials
   * @param userToCreate {Object} Object containing the user to be created
   * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
   */
    async login (userToLogIn) {
        try {
            const { user } = await User.authenticate('local')(userToLogIn.username, userToLogIn.password);

            if (! user) {
                return { success: false, body: "Username or password incorrect"};
            } else {
                const token =  jwt.sign({userId:user._id, username:user.username, role:user.role}, config.jwtSecret, {expiresIn: '24h'});
                return {success: true, body: "Authentication successful", token: token};
            }
        } catch (error) {
            return { success: false, body: error };
        }
    }

    /**
   * @description Attempt to change a user's password
   * @param userToCreate {Object} Object containing the user to be created
   * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
   */
    async changePassword (userData) {
        try {
            const user = await User.findByUsername(userData.username);
            if (!user) {
                return { success: false, body: 'The user does not exist' };
            } else {
                await user.changePassword(userData.oldPassword, userData.newPassword);
                return { success: true, body: 'password changed successful' };
            }
        } catch (error) {
            return { success: false, body: error };
        }
    }

        /**
   * @description Attempt to reset a user's password
   * @param userToCreate {Object} Object containing the user to be created
   * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
   */
    async resetPassword (userData) {
        try {
            const user = await User.findByUsername(userData.username);
            if (!user) {
                return { success: false, body: 'The user does not exist' };
            } else {
                await user.setPassword(userData.password);
                await user.resetAttempts();
                await user.save();
                return { success: true, body: 'password reset successful' };
            }
        } catch (error) {
            return { success: false, body: error };
        }
    }
}

module.exports = AuthService;