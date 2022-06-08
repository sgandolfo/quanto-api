const User = require('../models/User'); //User Model
const MongooseService = require('./MongooseService'); //Data Access Layer

class UserService {
  /**
   * @description Create an instance of UserService
   */
   constructor () {
    // Create instance of Data Access layer using our desired model
    this.MongooseServiceInstance = new MongooseService( User );
  }

    /**
   * @description Attempt to find a specific user by his login
   * @param userToGet {String} Object containing the login of the user to get
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

          /**
   * @description Attempt to delete a specific user by his id
   * @param userIdToGet {string} Required: ID for the object to retrieve
   * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
   */

      async deleteUser (id) {
          try {
                const result = await this.MongooseServiceInstance.delete(id);

                return { success: true, body: result };
          } catch (error) {
                return { success: false, error: err };
          }

      }
}

module.exports = UserService;