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
            const { userName, firstName, lastName, email, phone, password, address_1, landmark, city, state, pincode } = req.body;
            
            const active = 1;
            const user_role_id = 2;
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
                    "User registered successfully.",
                    {},
                    res
                );
            } else {
                return GLOBAL_ERROR_RESPONSE("Failed to register user.", {}, res);
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

    /** Function method to register the service provider Coded by Raj July 08 2025 */
    this.serviceProviderRegister = async (req, res) => {
        try {
            const { userName, firstName, lastName, email, phone, password, address_1, landmark, city, state, pincode } = req.body;
            
            const active = 1;
            const user_role_id = 3;
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
            const [rows] = await pool.query('SELECT * FROM roh_users WHERE email = ?', [email]);

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
                { id: user.id, email: user.email, role: user.user_role_id },
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
}
module.exports = new authApi();
