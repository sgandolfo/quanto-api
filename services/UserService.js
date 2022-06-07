const User = require('../models/User'); //User Model
const MongooseService = require('./MongooseService'); //Data Access Layer
const bcrypt = require('bcrypt'); //bcrypt for password encryption

class UserService {
  /**
   * @description Create an instance of UserService
   */
   constructor () {
    // Create instance of Data Access layer using our desired model
    this.MongooseServiceInstance = new MongooseService( User );
  }

    /**
   * @description Attempt to create a user with the provided object
   * @param userToCreate {object} Object containing all required fields to
   * create post
   * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
   */

     async create ( userToCreate ) {
        try {
            // Replace the users password with the hashed password
            userToCreate.password = await hashPassWord(userToCreate.password);

            // Call the create function of the MongooseServiceInstance to create the user in the database
            const result = await this.MongooseServiceInstance.create( userToCreate );

            return { success: true, body: result };

        } catch ( err ) {
            return { success: false, error: err };
        }
      }

        /**
   * @description Attempt to update a user with the provided object
   * @param userToUpdate {String} ID of the user to be updated
   * @param userData {Object} user data to be updated
   * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
   */

      async update ( userToUpdate, userData ) {
          try {
              // Check if user exists
                const user = await this.MongooseServiceInstance.findById(userToUpdate)

                // If user does not exist return success is false and empty body
                if (!user) {
                    return { success: false, status: 404, body: {}};
                }

                // Replace the user password with the hashed password
                userData.password = await hashPassWord(userData.password);

                const result = await this.MongooseServiceInstance.update(userToUpdate, userData);

                return { success: true, body: result };
            
          } catch (err) {
              return { success: false, body: err };
          }
      }

    /**
   * @description Attempt to find a specific user by his login
   * @param userToGet {object} Object containing the login of the user to get
   * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
   */
      async getUserByLogin( userToGet ) {
          try {
            // Get the name, login and role of a user by searching for the login of the user
            const result = await this.MongooseServiceInstance.findOne({login: {$regex: userToGet}}, 'name login role');

            return { success: true, body: result };

          } catch (err) {
            return { success: false, error: err };
          } 
      }

    /**
   * @description Attempt to find a specific user by his id
   * @param userIdToGet {string} Required: ID for the object to retrieve
   * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
   */

    async getUserById ( userIdToGet ) {
        try {
            // Get the name, login and role of a user by searching for the id of the user
            const result = await this.MongooseServiceInstance.findById(userIdToGet, 'name login role');
            return { success: true, body: result };
        } catch (err) {
            return { success: false, error: err };
        }
    }

        /**
     * @description Attempt to get all users
     * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
     */
      async getAllUsers () {
          try {
              // Get all users from the User database and return their names, login and roles
              const result = await this.MongooseServiceInstance.find({}, 'name login role');

              return { success: true, body: result };
          } catch (err) {
              return { success: false, error: err };
          }
      }
}

const hashPassWord = async (password) => {
    // Generate a salt to hash password
    const salt = await bcrypt.genSalt(10);

    // Set password to hashed password
    const hashedPassword = await bcrypt.hash(password, salt);

    //return the hashedpassword
    return hashedPassword;
}

module.exports = UserService;