const UserService = require( "../services/UserService" );
const UserServiceInstance = new UserService();

module.exports = { createUser, getUserByLogin, getAllUsers, getUserById, updateUser };

/**
 * @description Create a user with the provided body
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {Promise<*>}
 */
async function createUser ( req, res ) {
  try {
    const createdUser = await UserServiceInstance.create( req.body );
    return res.send( createdUser );
  } catch ( err ) {
    res.status( 500 ).send( error );
  }
}

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
 * @description Update a user with the provided body
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {Promise<*>}
 */

 async function updateUser(req, res) {
    try {
        const updatedUser = await UserServiceInstance.update( req.params.id, req.body );

        return res.send( updatedUser );

    } catch (error) {
        res.status(500).send(error);
    }
}