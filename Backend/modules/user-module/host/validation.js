const { pool } = require("../../../config/connection");

/** Validate get all active category - Coded by Vishnu August 19 2025 */
const ValidategetUserActivecategory = async (req, res, next) => {
    try {
        next();
    } catch (err) {
        console.error("Validation error:", err);
        return GLOBAL_ERROR_RESPONSE("Validation error", { error: err.message || err }, res);
    }
}

module.exports = {ValidategetUserActivecategory};