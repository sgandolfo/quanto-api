const UserService = require( "../services/UserService" );
const UserServiceInstance = new UserService();

module.exports = { getUserByLogin, getAllUsers, getUserById, deleteUser };

/**
 * @description Gets a user with the provided login
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {Promise<*>}
 */
async function getUserByLogin (req, res) {
    try {
        const fetchedUser = await UserServiceInstance.getUserByLogin( req.params.login );
        return res.send ( fetchedUser ); 
    } catch (error) {
        res.status(500).send( error );
    }
}

/**
 * @description Gets a user with the provided id
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {Promise<*>}
 */

async function getUserById (req, res) {
    try {
        const fetchedUser = await UserServiceInstance.getUserById( req.params.id );
        return res.send ( fetchedUser ); 
    } catch (error) {
        res.status(500).send( error );
    }
}

/**
 * @description Gets all users with the provided body
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {Promise<*>}
 */

async function getAllUsers(req, res) {
    try {
        const allUsers = await UserServiceInstance.getAllUsers();
        return res.send( allUsers );
    } catch (error) {
        res.status(500).send(error);
    }
}

/**
 * @description Delete a user based on it's id
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {Promise<*>}
 */

async function deleteUser (req, res) {
    try {
        const result = await UserServiceInstance.deleteUser(req.body._id);
        return res.send(result)
    } catch (error) {
        res.status(500).send(error);
    }
}
