// controller.js
const pool = require('../../../config/connection');  // Correct import of the promisePool
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const saltRounds = 10;

function authApi() {

    /** Function method to register the user Coded by Raj July 08 2025 */
    this.userRegister = async (req, res) => {
        try {
            const { userName, firstName, lastName, email, phone, password } = req.body;

            const active = 0;  // Initial status 0
            const user_role_id = 3;

            let passwordHash;
            try {
                passwordHash = await bcrypt.hash(password, saltRounds);
            } catch (err) {
                return GLOBAL_ERROR_RESPONSE("Error hashing password.", err, res);
            }

            const sql = `
            INSERT INTO roh_users
                (user_name, first_name, last_name, email, phone_number, password_hash, user_role_id, active, authorize_code, verified)
            VALUES
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const otp = Math.floor(100000 + Math.random() * 900000).toString();  // Generate OTP

            const params = [
                userName,
                firstName,
                lastName,
                email,
                phone,
                passwordHash,
                user_role_id,
                active,
                otp,  // Save OTP in the 'authorize_code' field
                0, // Set 'verified' status to 0
            ];

            const [result] = await pool.query(sql, params);

            if (result.affectedRows === 1) {
                return GLOBAL_SUCCESS_RESPONSE("User registered successfully. OTP sent.", { otp }, res);
            } else {
                return GLOBAL_ERROR_RESPONSE("Failed to register user.", {}, res);
            }
        } catch (err) {
            let message = "Internal server error";
            if (err.code === 'ER_DUP_ENTRY') {
                message = "Duplicate User Name Or Email.";
            }
            return GLOBAL_ERROR_RESPONSE(message, err, res);
        }
    };


    /** Function method to register the service provider Coded by Raj July 08 2025 */
    this.serviceProviderRegister = async (req, res) => {
        try {
            const { userName, firstName, lastName, email, phone, password, address_1, landmark, city, state, pincode } = req.body;
            
            const active = 1;
            const user_role_id = 2; /** Need to use the role id for the service provider. */
            const profile_picture_url = "";

            let passwordHash;
            try {
                passwordHash = await bcrypt.hash(password, saltRounds);
            } catch (err) {
                return GLOBAL_ERROR_RESPONSE("Error hashing password.", err, res);
            }

            /** SQL query to insert data into the users table */
            const sql = `INSERT INTO roh_users (user_name, first_name, last_name, email, phone_number, password_hash, user_role_id, profile_picture_url, active, address_1, landmark, state, city, pincode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            /* Execute the query using the pool */
            const [result] = await pool.query(sql, [ userName, firstName, lastName, email, phone, passwordHash, user_role_id, profile_picture_url, active, address_1, landmark, city, state, pincode]);

            if (result.affectedRows === 1) {
                return GLOBAL_SUCCESS_RESPONSE(
                    "Service provider registered successfully.",
                    {},
                    res
                );
            } else {
                return GLOBAL_ERROR_RESPONSE("Failed to register service provider.", {}, res);
            }

        } catch (err) {
            let message = "Internal server error";
            /** MySQL errors like duplicate entries for user */
            if (err.code === 'ER_DUP_ENTRY') {
                message = "Duplicate User Name Or Email.";
            }
            return GLOBAL_ERROR_RESPONSE(message, err, res);
        }
    };

    /** Function method to login the user - Coded by Raj July 09 2025 */
    this.userLogin = async (req, res) => {
        try {
            const {email, password} = req.body;

            /* Query the user from 'roh_users' by email */
            const [rows] = await pool.query('SELECT email, password_hash, user_role_id FROM roh_users WHERE email = ?', [email]);

            if (rows.length == 0) {
                return res.status(401).json({ message: 'Invalid email or password.' });
            }

            const user = rows[0];

            /* Compare the password with the stored hash */
            const isMatch = await bcrypt.compare(password, user.password_hash);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password.' });
            }

            /* Generate JWT */
            const token = jwt.sign(
                { id: user.id, email: user.email},
                // JWT_SECRET,
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            /* Respond with success */
            return res.status(200).json({
                message: 'Login successful.',
                token,
                user: {
                    id: user.id,
                    userName: user.user_name,
                    email: user.email,
                    firstName: user.first_name,
                    lastName: user.last_name,
                }
            });
        } catch (error) {
            console.error('Login error:', error);
            return res.status(500).json({ message: 'Internal Server error' });
        }
    };

    /** Function method to login the admin users - Coded by Raj July 10 2025 */
    this.adminUserLogin = async (req, res) => {
        try {
            const {email, password} = req.body;

            /* Query the user from 'roh_users' by email */
            const [rows] = await pool.query('SELECT user_id, email, password_hash, user_role_id, user_name, first_name, last_name FROM roh_users WHERE email = ?', [email]);

            if (rows.length == 0) {
                return res.status(401).json({ message: 'Invalid email or password.' });
            }

            const user = rows[0];

            /* Compare the password with the stored hash */
            const isMatch = await bcrypt.compare(password, user.password_hash);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password.' });
            }

            /* Generate JWT */
            const token = jwt.sign(
                { id: user.user_id, email: user.email},
                // JWT_SECRET,
                process.env.JWT_SECRET,
                { expiresIn: '2h' }
            );

            /* Respond with success */
            return res.status(200).json({
                message: 'Login successful.',
                token,
                user: {
                    id: user.user_id,
                    userName: user.user_name,
                    email: user.email,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    role_id: user.user_role_id
                }
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server error' });
        }
    };

    /** Function method to check availability of user - Coded by Vishnu Aug 11 2025 */
    this.checkAvailability = async (req, res) => {
    try {
        const { userName, email } = req.body || {};
        const taken = { userName: false, email: false, phone: false };

        // Build dynamic WHEREs only for provided fields
        const checks = [];
        const params = [];
        if (userName) { checks.push("user_name = ?"); params.push(userName); }
        if (email)    { checks.push("email = ?");     params.push(email); }

        if (!checks.length) {
        return GLOBAL_ERROR_RESPONSE("No fields to check.", {}, res);
        }

        // Single query for speed using OR, then inspect rows
        const sql = `
        SELECT user_name, email
        FROM roh_users
        WHERE ${checks.join(" OR ")}
        LIMIT 50
        `;
        const [rows] = await pool.query(sql, params);

        if (rows?.length) {
        for (const r of rows) {
            if (userName && r.user_name === userName) taken.userName = true;
            if (email && r.email === email) taken.email = true;
        }
        }

        return GLOBAL_SUCCESS_RESPONSE("Availability fetched.", { taken }, res);
    } catch (err) {
        return GLOBAL_ERROR_RESPONSE("Failed to check availability.", err, res);
    }
    };

    /** OTP Verification Endpoint - Coded by Vishnu Aug 12 2025 */
    this.verifyOTP = async (req, res) => {
        try {
            const { userName, otp } = req.body;

            const sql = "SELECT authorize_code, active FROM roh_users WHERE user_name = ?";
            const [rows] = await pool.query(sql, [userName]);

            if (rows.length === 0) {
                return GLOBAL_ERROR_RESPONSE("User not found", {}, res);
            }

            const user = rows[0];

            if (user.authorize_code !== otp) {
                return GLOBAL_ERROR_RESPONSE("Invalid OTP", {}, res);
            }

            const updateSql = "UPDATE roh_users SET active = 1, authorize_code = NULL, verified = 1 WHERE user_name = ?";
            await pool.query(updateSql, [userName]);

            return GLOBAL_SUCCESS_RESPONSE("OTP verified successfully. Account activated.", {}, res);
        } catch (err) {
            return GLOBAL_ERROR_RESPONSE("OTP verification failed", err, res);
        }
    };

    /** Resend OTP Endpoint - Coded by Vishnu Aug 12 2025 */
    this.resendOTP = async (req, res) => {
        try {
            const { userName } = req.body;

            const sql = "SELECT email, authorize_code FROM roh_users WHERE user_name = ?";
            const [rows] = await pool.query(sql, [userName]);

            if (rows.length === 0) {
                return GLOBAL_ERROR_RESPONSE("User not found", {}, res);
            }

            const user = rows[0];
            const otp = Math.floor(100000 + Math.random() * 900000).toString();  // Generate new OTP

            const updateSql = "UPDATE roh_users SET authorize_code = ? WHERE user_name = ?";
            await pool.query(updateSql, [otp, userName]);

            return GLOBAL_SUCCESS_RESPONSE("New OTP has been sent.", { otp }, res);
        } catch (err) {
            return GLOBAL_ERROR_RESPONSE("Failed to resend OTP", err, res);
        }
    };
}
module.exports = new authApi();
