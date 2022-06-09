const jwt = require("jsonwebtoken");
const config = require('../config/config'); //config

/**
 * @description Verify token in request for validity
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {Promise<*>}
 */

module.exports = (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.status(403).send("Access denied.");

        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded;
        return next();
    } catch (error) {
        res.status(400).send("Invalid token");
    }
};