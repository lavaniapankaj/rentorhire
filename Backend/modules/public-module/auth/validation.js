const { pool } = require("../../../config/connection");

/** User registration validation - Coded by Raj - July 08 2025 */
const validateUserSignUp = (req, res, next) => {

    const { userName, firstName, email, phone, password, address_1, landmark, city, state, pincode } = req.body;
    /** Validate required fields */
    if (!userName) {
        return GLOBAL_ERROR_RESPONSE("User name can't be empty.", {}, res);
    }
    if (!firstName) {
        return GLOBAL_ERROR_RESPONSE("First name can't be empty.", {}, res);
    }
    if (!email) {
        return GLOBAL_ERROR_RESPONSE("Email can't be empty.", {}, res);
    }
    if (!phone) {
        return GLOBAL_ERROR_RESPONSE("Phone can't be empty.", {}, res);
    }
    if (!password) {
        return GLOBAL_ERROR_RESPONSE("Password can't be empty.", {}, res);
    }
    if (!address_1) {
        return GLOBAL_ERROR_RESPONSE("Address 1 can't be empty.", {}, res);
    }
    if (!city) {
        return GLOBAL_ERROR_RESPONSE("City name can't be empty.", {}, res);
    }
    if (!state) {
        return GLOBAL_ERROR_RESPONSE("State name can't be empty.", {}, res);
    }
    if (!pincode) {
        return GLOBAL_ERROR_RESPONSE("Pincode can't be empty.", {}, res);
    }

    /** Check if user name exists */
    const checkUsernameQuery = `SELECT * FROM roh_users WHERE user_name = ? AND active = 1 LIMIT 1`;
    pool.query(checkUsernameQuery, [userName], (err, usernameResult) => {
        if (err) {
            return GLOBAL_ERROR_RESPONSE("Error checking for duplicate user name.", err, res);
        }

        if (usernameResult.length > 0) {
            return GLOBAL_ERROR_RESPONSE("User name already exists.", {}, res);
        }

        /** Check if email exists */
        const checkEmailQuery = `SELECT * FROM roh_users WHERE email = ? AND active = 1 LIMIT 1`;

        pool.query(checkEmailQuery, [email], (err, emailResult) => {
            if (err) {
                return GLOBAL_ERROR_RESPONSE("Error checking for duplicate email.", err, res);
            }

            if (emailResult.length > 0) {
                return GLOBAL_ERROR_RESPONSE("Email already exists.", {}, res);
            }

            /** If both checks pass, continue */
            next();
        });
    });
};

/** service provider registration validation - Coded by Raj - July 08 2025 */
const validateServiceProviderRegister = (req, res, next) => {

    const { userName, firstName, email, phone, password, address_1, landmark, city, state, pincode } = req.body;
    /** Validate required fields */
    if (!userName) {
        return GLOBAL_ERROR_RESPONSE("User name can't be empty.", {}, res);
    }
    if (!firstName) {
        return GLOBAL_ERROR_RESPONSE("First name can't be empty.", {}, res);
    }
    if (!email) {
        return GLOBAL_ERROR_RESPONSE("Email can't be empty.", {}, res);
    }
    if (!phone) {
        return GLOBAL_ERROR_RESPONSE("Phone can't be empty.", {}, res);
    }
    if (!password) {
        return GLOBAL_ERROR_RESPONSE("Password can't be empty.", {}, res);
    }
    if (!address_1) {
        return GLOBAL_ERROR_RESPONSE("Address 1 can't be empty.", {}, res);
    }
    if (!city) {
        return GLOBAL_ERROR_RESPONSE("City name can't be empty.", {}, res);
    }
    if (!state) {
        return GLOBAL_ERROR_RESPONSE("State name can't be empty.", {}, res);
    }
    if (!pincode) {
        return GLOBAL_ERROR_RESPONSE("Pincode can't be empty.", {}, res);
    }

    /** Check if user name exists */
    const checkUsernameQuery = `SELECT * FROM roh_users WHERE user_name = ? AND active = 1 LIMIT 1`;
    pool.query(checkUsernameQuery, [userName], (err, usernameResult) => {
        if (err) {
            return GLOBAL_ERROR_RESPONSE("Error checking for duplicate user name.", err, res);
        }

        if (usernameResult.length > 0) {
            return GLOBAL_ERROR_RESPONSE("User name already exists.", {}, res);
        }

        /** Check if email exists */
        const checkEmailQuery = `SELECT * FROM roh_users WHERE email = ? AND active = 1 LIMIT 1`;

        pool.query(checkEmailQuery, [email], (err, emailResult) => {
            if (err) {
                return GLOBAL_ERROR_RESPONSE("Error checking for duplicate email.", err, res);
            }

            if (emailResult.length > 0) {
                return GLOBAL_ERROR_RESPONSE("Email already exists.", {}, res);
            }

            /** If both checks pass, continue */
            next();
        });
    });
};

/** User login validation - Coded by Raj - July 09 2025 */
const validateUserLogin = (req, res, next) => {
    const { email, password } = req.body;
    /** Validate required fields */
    if (!email) {
        return GLOBAL_ERROR_RESPONSE("Email can't be empty.", {}, res);
    }
    if (!password) {
        return GLOBAL_ERROR_RESPONSE("Password can't be empty.", {}, res);
    }

    /** Check if email exists */
    const checkEmailQuery = `SELECT email, user_role_id FROM roh_users WHERE email = ? AND active = 1 LIMIT 1`;
    pool.query(checkEmailQuery, [email], (err, emailResult) => {
        if (err) {
            return GLOBAL_ERROR_RESPONSE("Error in admin login.", err, res);
        }

        if (emailResult.length > 0) {
            /** If email exists */
            if (emailResult[0].user_role_id == 6) {
                next();
            } else {
                return GLOBAL_ERROR_RESPONSE("You are not allowed to access.", {}, res);
            }
        } else {
            return GLOBAL_ERROR_RESPONSE("Invalid email address.", {}, res);
        }
    });
};

/** Admin login validation - Coded by Raj - July 10 2025 */
const validateAdminUserLogin = (req, res, next) => {
    const { email, password } = req.body;
    /** Validate required fields */
    if (!email) {
        return GLOBAL_ERROR_RESPONSE("Email can't be empty.", {}, res);
    }
    if (!password) {
        return GLOBAL_ERROR_RESPONSE("Password can't be empty.", {}, res);
    }

    /** Check if email exists */
    const checkEmailQuery = `SELECT email, user_role_id FROM roh_users WHERE email = ? AND active = 1 LIMIT 1`;
    pool.query(checkEmailQuery, [email], (err, emailResult) => {
        if (err) {
            return GLOBAL_ERROR_RESPONSE("Error in admin login.", err, res);
        }

        if (emailResult.length > 0) {
            /** If email exists */
            if (emailResult[0].user_role_id == 4) {
                next();
            } else {
                return GLOBAL_ERROR_RESPONSE("You are not allowed to access.", {}, res);
            }
        } else {
            return GLOBAL_ERROR_RESPONSE("Invalid email address.", {}, res);
        }
    });
};

module.exports = {validateUserSignUp, validateServiceProviderRegister, validateUserLogin, validateAdminUserLogin};