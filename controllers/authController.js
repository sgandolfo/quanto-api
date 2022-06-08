const AuthService = require( "../services/AuthService" );
const AuthServiceInstance = new AuthService();

module.exports = { login, register, changePassword, resetPassword };

/**
 * @description Log a user in with his/her credentials
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {Promise<*>}
 */
async function login (req, res) {
    try {
        const loggedInUser = await AuthServiceInstance.login(req.body);
        return res.send(loggedInUser);
    } catch (error) {
        res.status( 500 ).send(error);
    }
}

/**
 * @description Register a new user
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {Promise<*>}
 */
async function register (req, res) {
    try {
        const newUser = await AuthServiceInstance.register(req.body);
        return res.send(newUser);
    } catch (error) {
        res.status( 500 ).send(error);
    }
}

/**
 * @description Change a user's password
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {Promise<*>}
 */
async function changePassword (req, res) {
    try {
        const result = await AuthServiceInstance.changePassword(req.body);
        return res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

/**
 * @description Reset a user's password
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {Promise<*>}
 */
async function resetPassword (req, res) {
    try {
        const result = await AuthServiceInstance.resetPassword(req.body);
        return res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}