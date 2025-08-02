const { pool } = require('../../../config/connection');  /** Import the pool */
const bcrypt = require('bcryptjs');
const path = require('path');

function UsersApi() {
    /** Add new user in roh_users table Coded by Vishnu July 06 2025 */
    this.AddnewUser = async (req, res) => {
        try {
            const { 
                user_name, 
                first_name, 
                last_name, 
                email, 
                phone_number, 
                password_hash, 
                user_role_id, 
                profile_picture_url, 
                address_1, 
                landmark, 
                state, 
                city, 
                pincode, 
                add_id, 
                edit_id 
            } = req.body;
    
    
            /** If the user hasn't uploaded an image, set profile_picture_url to null */
            let profileImageName = null;
            let profileImagePath = null;
            let profileImageType = null;
    
            if (profile_picture_url) {
                /** If the profile_picture_url is provided, process it */
                const fileExtension = path.extname(profile_picture_url); /** e.g. '.webp', '.jpg' */
                profileImageName = profile_picture_url;  /** File name from request */
                profileImagePath = `/media/users/profile/`;
                profileImageType = fileExtension.slice(1);  /** Remove the dot (e.g. 'webp', 'jpg') */
    
            }
    
            /** Insert the image into the media gallery table only if an image is uploaded */
            if (profileImageName) {
                const mediaQuery = `INSERT INTO roh_media_gallery (file_name, file_path, file_type, active) VALUES (?, ?, ?, ?)`;
                const mediaValues = [profileImageName, profileImagePath, profileImageType, 1];
                
                pool.execute(mediaQuery, mediaValues, (err, mediaResult) => {
                    if (err) {
                        console.error('Error inserting into media gallery:', err);
                        return GLOBAL_ERROR_RESPONSE("Error saving image to media gallery", err, res);
                    }
    
    
                    /** Now insert the user data into the 'roh_users' table, using the media gallery id for the profile picture URL */
                    const userQuery = `INSERT INTO roh_users (user_name, first_name, last_name, email, phone_number, password_hash, user_role_id, profile_picture_url, address_1, landmark, state, city, pincode, add_id, edit_id, active) 
                                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
                    const userValues = [user_name, first_name, last_name, email, phone_number, password_hash, user_role_id, mediaResult.insertId, address_1, landmark, state, city, pincode, add_id, edit_id, 1];
    
                    pool.execute(userQuery, userValues, (err, result) => {
                        if (err) {
                            console.error('Error inserting user:', err);
                            // return GLOBAL_ERROR_RESPONSE("Error saving user", err, res);
                            return GLOBAL_ERROR_RESPONSE("Please check your inputs values", err, res);
                        }
    
                        return GLOBAL_SUCCESS_RESPONSE("User added successfully", { id: result.insertId }, res);
                    });
                });
            } else {
                /** If no image is uploaded, insert the user data without the profile picture */
                const userQuery = `INSERT INTO roh_users (user_name, first_name, last_name, email, phone_number, password_hash, user_role_id, profile_picture_url, address_1, landmark, state, city, pincode, add_id, edit_id, active) 
                                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
                const userValues = [user_name, first_name, last_name, email, phone_number, password_hash, user_role_id, null, address_1, landmark, state, city, pincode, add_id, edit_id, 1];
    
                pool.execute(userQuery, userValues, (err, result) => {
                    if (err) {
                        console.error('Error inserting user:', err);
                        // return GLOBAL_ERROR_RESPONSE("Error saving user", err, res);
                        return GLOBAL_ERROR_RESPONSE("Please check your inputs values", err, res);
                    }
    
                    return GLOBAL_SUCCESS_RESPONSE("User added successfully", { id: result.insertId }, res);
                });
            }
    
        } catch (err) {
            console.error('Unexpected error:', err);
            return GLOBAL_ERROR_RESPONSE("Internal server error", err, res);
        }
    };
    
    
    /** Get all users in roh_users table Coded by Vishnu July 07 2025 */
    this.GetAllUsers = async (req, res) => {
        try {
            const page = parseInt(req.body.page) || 1;
            const limit = parseInt(req.body.limit) || 10;
            const offset = (page - 1) * limit;
    
            // Capture filter parameters
            const userName = req.body.user_name || '';
            const userRoleId = req.body.user_role_id || '';
            const active = req.body.active !== undefined ? req.body.active : '';  // Empty string means no filter
    
            const connection = pool.promise();
    
            // Fetch all users without pagination first
            let query = `SELECT user_id, user_name, first_name, last_name, email, phone_number, user_role_id, add_id, edit_id, active FROM roh_users WHERE 1=1`;
            let queryParams = [];
    
            if (userName) {
                query += ` AND (user_name LIKE ? OR first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR phone_number LIKE ?)`;
                const likeValue = `%${userName}%`;
                queryParams.push(likeValue, likeValue, likeValue, likeValue, likeValue);
            }
            
            if (userRoleId) {
                query += ' AND user_role_id = ?';
                queryParams.push(userRoleId);
            }
            if (active !== '') {
                query += ' AND active = ?';
                queryParams.push(active);
            }
    
            // Get all users that match the filters
            const [allUsers] = await connection.execute(query, queryParams);
    
            // Total count of filtered users
            const total = allUsers.length;
            const totalPages = Math.ceil(total / limit);
    
            // If no users at all
            if (total === 0 || page > totalPages) {
                return GLOBAL_SUCCESS_RESPONSE("No users found", {
                    users: [],
                    page,
                    limit,
                    total,
                    totalPages
                }, res);
            }
    
            // Now paginate the filtered results
            const paginatedUsers = allUsers.slice(offset, offset + limit);
    
            return GLOBAL_SUCCESS_RESPONSE("Users fetched successfully", {
                users: paginatedUsers,
                page,
                limit,
                total,
                totalPages,
            }, res);
    
        } catch (err) {
            console.error("GetAllUsers error:", err);
            return GLOBAL_ERROR_RESPONSE("Internal server error", err, res);
        }
    };
    
    /** Update user in roh_users table Coded by Vishnu July 07 2025 */
    this.UpdateUser = async (req, res) => {
        try {
            const {
                user_id,
                first_name,
                last_name,
                email,
                phone_number,
                user_role_id,
                password_hash,
                profile_picture_url,  /** Existing profile picture (could be null or the current ID) */
                address_1,
                landmark,
                state,
                city,
                pincode,
                edit_id,
            } = req.body;

            let query = `
                UPDATE roh_users SET
                    first_name = ?,
                    last_name = ?,
                    email = ?,
                    phone_number = ?,
                    user_role_id = ?,
            `;

            const params = [
                first_name,
                last_name,
                email,
                phone_number,
                user_role_id,
            ];

            /** Hash password if provided and valid */
            if (password_hash && password_hash.trim() !== "") {
                if (password_hash.length < 8) {
                    return GLOBAL_ERROR_RESPONSE("Password must be at least 8 characters long", null, res);
                }

                const hashedPassword = await bcrypt.hash(password_hash.trim(), 10); /** Salt rounds = 10 */
                query += `password_hash = ?, `;
                params.push(hashedPassword);
            }

            let updatedProfilePictureUrl = profile_picture_url; /** Default to the existing ID if no new file */


            /** Handling the profile picture URL update */
            if (req.file) {
                /** If a new file is uploaded, save it in media gallery */
                const fileExtension = path.extname(req.file.filename);

                const mediaQuery = `INSERT INTO roh_media_gallery (file_name, file_path, file_type, active) VALUES (?, ?, ?, ?)`;
                const mediaValues = [req.file.filename, `/media/users/profile/`, fileExtension.slice(1), 1];

                /** Use promise-based query (this is where the fix happens) */
                const [mediaResult] = await pool.promise().query(mediaQuery, mediaValues);

                /** Save the media ID in profile_picture_url */
                updatedProfilePictureUrl = mediaResult.insertId;
            }

            /** Final update query to the users table */
            query += `
                profile_picture_url = ?,
                address_1 = ?,
                landmark = ?,
                state = ?,
                city = ?,
                pincode = ?,
                edit_id = ?
                WHERE user_id = ?
            `;

            params.push(
                updatedProfilePictureUrl,  /** Updated media ID or existing ID */
                address_1,
                landmark,
                state,
                city,
                pincode,
                edit_id,
                user_id
            );


            const result = await pool.promise().query(query, params); /** Use promise-based query here */

            return GLOBAL_SUCCESS_RESPONSE("User updated successfully", result, res);

        } catch (err) {
            console.error('Unexpected error:', err);
            return GLOBAL_ERROR_RESPONSE("Internal server error", err, res);
        }
    };

    
    /** Delete user in roh_users table Coded by Vishnu July 07 2025 */
    this.DeleteUser = async (req, res) => {
        try {
            const { user_id } = req.body;
    
            const query = `UPDATE roh_users SET active = 0 WHERE user_id = ?`;
    
            pool.query(query, [user_id], (err, result) => {
                if (err) {
                    return GLOBAL_ERROR_RESPONSE("Error deleting user", err, res);
                }
    
                if (result.affectedRows === 0) {
                    return GLOBAL_ERROR_RESPONSE("No user deleted", {}, res);
                }
    
                return GLOBAL_SUCCESS_RESPONSE("User deleted successfully", result, res);
            });
    
        } catch (err) {
            return GLOBAL_ERROR_RESPONSE("Internal server error", err, res);
        }
    };

    /** View user details in roh_users table Coded by Vishnu July 07 2025 */
    this.ViewUser = async (req, res) => {
        try {
            const { user_id } = req.body;  /** Get user_id from the request body */

            /** Query to fetch user details along with profile picture from the roh_media_gallery table */
            const query = `SELECT u.*, m.file_name, m.file_path FROM roh_users u LEFT JOIN roh_media_gallery m ON u.profile_picture_url = m.id WHERE u.user_id = ?`;

            pool.query(query, [user_id], (err, result) => {
                if (err) {
                    return GLOBAL_ERROR_RESPONSE("Error fetching user details", err, res);
                }

                if (result.length === 0) {
                    return GLOBAL_ERROR_RESPONSE("User not found", {}, res);
                }

                return GLOBAL_SUCCESS_RESPONSE("User details fetched successfully", result, res);
            });

        } catch (err) {
            return GLOBAL_ERROR_RESPONSE("Internal server error", err, res);
        }
    };

}

module.exports = new UsersApi();

