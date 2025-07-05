const pool = require("../../../config/connection");

/** Add new state validation Coded by Vishnu June 04 2025 */
const ValidateaddnewState = async (req, res, next) => {
    console.log("Validation check here, add new state");

    const { state_name, state_slug } = req.body;

    /** Validate required fields */
    if (!state_name || !state_slug) {
        return GLOBAL_ERROR_RESPONSE("State Name and Slug are required", {}, res);
    }

    /** Check if state_slug already exists in the database */
    const checkQuery = `
        SELECT * FROM roh_states WHERE state_slug = ?
    `;
    
    try {
        const [result] = await pool.query(checkQuery, [state_slug]);

        if (result.length > 0) {
            return GLOBAL_ERROR_RESPONSE("State with this slug already exists", {}, res);
        }

        /** If everything is okay, proceed to the next middleware/controller */
        next();

    } catch (err) {
        return GLOBAL_ERROR_RESPONSE("Error checking state slug", err, res);
    }
};

/** Get all state validation Coded by Vishnu June 04 2025 */
const ValidategetallState = async (req, res, next) => {
    try {
        /** Get page and limit from query parameters */
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        /** Validate page and limit */
        if (!page || page < 1) {
            return GLOBAL_ERROR_RESPONSE("Page number must be a positive integer", {}, res);
        }

        if (!limit || limit < 1) {
            return GLOBAL_ERROR_RESPONSE("Limit must be a positive integer", {}, res);
        }

        /** SQL query to check if there are any active states */
        const query = `
            SELECT * FROM roh_states WHERE active = 1
        `;
        
        /** Execute the query to check if states exist */
        const [result] = await pool.query(query);

        /** If no states are found, return an error response */
        if (result.length === 0) {
            return GLOBAL_ERROR_RESPONSE("No active states found", {}, res);
        }

        /** If everything is okay, proceed to the next middleware/controller */
        next();
    } catch (err) {
        return GLOBAL_ERROR_RESPONSE("Error validating states", err, res);
    }
};

/** Edit state validation Coded by Vishnu June 04 2025 */
const ValidateeditState = async (req, res, next) => {
    console.log("Validation check here, edit state");

    /** Destructure the data from the request body */
    const { state_id, state_name, state_slug } = req.body;

    /** Validate that state_id, state_name, and state_slug are present */
    if (!state_id || !state_name || !state_slug) {
        return GLOBAL_ERROR_RESPONSE("State ID, Name, and Slug are required", {}, res);
    }

    /** If validation passes, proceed to the next middleware/controller */
    next();
};

/** Delete state validation Coded by Vishnu June 04 2025 */
const ValidateDeleteState = async (req, res, next) => {
    console.log("Validation check here, delete state");

    /** Destructure the state_id from the request body */
    const { state_id } = req.body;

    /** Validate if state_id is provided */
    if (!state_id) {
        return GLOBAL_ERROR_RESPONSE("State ID is required", {}, res);
    }

    /** If validation passes, call the next middleware/controller */
    next();
};

module.exports = { ValidateaddnewState, ValidategetallState, ValidateeditState, ValidateDeleteState };