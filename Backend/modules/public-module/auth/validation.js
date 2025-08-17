const { pool } = require("../../../config/connection");

/** User registration validation - Coded by Raj - July 08 2025 */
const validateUserSignUp = (req, res, next) => {

    const { userName, firstName, email, phone, password } = req.body;
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

  if (!email?.trim()) {
    return res.status(400).json({ message: "Email can't be empty." });
  }
  if (!password?.trim()) {
    return res.status(400).json({ message: "Password can't be empty." });
  }

  const checkEmailQuery = `
    SELECT email, user_role_id FROM roh_users
    WHERE email = ? LIMIT 1
  `;

  pool.query(checkEmailQuery, [email], (err, emailResult) => {
    if (err) {
      return res.status(500).json({ message: "Error in user login.", error: err });
    }

    if (emailResult.length === 0) {
      return res.status(401).json({ message: "Invalid email address." });
    }

    if (emailResult[0].user_role_id != 3) {
      return res.status(403).json({ message: "You are not allowed to access." });
    }

    next();
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
            /** If email exists and the user role is Superadmin */
            if (emailResult[0].user_role_id == 1) {
                next();
            } else {
                return GLOBAL_ERROR_RESPONSE("You are not allowed to access.", {}, res);
            }
        } else {
            return GLOBAL_ERROR_RESPONSE("Invalid email address.", {}, res);
        }
    });
};

/** Availability check validation - Coded by Vishnu Aug 11 2025 */
const validateAvailabilityCheck = (req, res, next) => {
    const { userName, email } = req.body;
    /** Validate required fields */
    if (!userName) {
        return GLOBAL_ERROR_RESPONSE("User name can't be empty.", {}, res);
    }
    if (!email) {
        return GLOBAL_ERROR_RESPONSE("Email can't be empty.", {}, res);
    }
    
    next();
};

/** OTP Verification - Coded by Vishnu Aug 12 2025 */
const validateOTP = (req, res, next) => {
    const { otp } = req.body;
    /** Validate required fields */
    if (!otp) {
        return GLOBAL_ERROR_RESPONSE("OTP can't be empty.", {}, res);
    }
    
    next();
};

/** Resend OTP - Coded by Vishnu Aug 12 2025 */
const validateResendOTP = (req, res, next) => {
    const { userName } = req.body;
    /** Validate required fields */
    if (!userName) {
        return GLOBAL_ERROR_RESPONSE("User name can't be empty.", {}, res);
    }
    
    next();
};

/** user login verifyOtp - Coded by Vishnu Aug 13 2025 */
const verifyOtp = (req, res, next) => {
    const { userId, otp } = req.body;
    /** Validate required fields */
    if (!userId) {
        return GLOBAL_ERROR_RESPONSE("User Id can't be empty.", {}, res);
    }
    if (!otp) {
        return GLOBAL_ERROR_RESPONSE("OTP can't be empty.", {}, res);
    }
    
    next();
};


module.exports = {validateUserSignUp, validateServiceProviderRegister, validateUserLogin, validateAdminUserLogin, validateAvailabilityCheck, validateOTP, validateResendOTP, verifyOtp};