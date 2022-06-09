const ac = require('../config/accesscontrol');

/**
 * @description authorize a user based on the action the user wants to perform and the resource on which the user
 * wants to apply the action
 * @param action {String} action to be performed by the user 
 * @param resource {String} resource on which the action needs to be performed
 */

module.exports = function(action, resource) {
 return async (req, res, next) => {
  try {

    // Check if the action includes an action on the user's own data
    // If yes, perform extra check to ensure the data owner is the same as the user executing the action
    if(action.includes('Own')) {
        if (req.user.userId != req.params.id) {
            return res.status(401).json({
                error: "You don't have enough permission to perform this action"
               });
        }
    }

    // Check permission based on user's role, action and resource
   const permission = ac.can(req.user.role)[action](resource);

   // If not permission not granted, return message
   if (!permission.granted) {
    return res.status(401).json({
     error: "You don't have enough permission to perform this action"
    });
   }

   // If permission is granted, call next() function to run the following callback function in the router
   next()

  } catch (error) {
   next(error)
  }
 }
}