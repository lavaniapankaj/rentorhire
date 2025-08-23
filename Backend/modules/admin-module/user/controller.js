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
                    const userQuery = `INSERT INTO roh_users (user_name, first_name, last_name, email, phone_number, password_hash, user_role_id, profile_picture_url, address_1, landmark, state, city, pincode, verified, add_id, edit_id, active) 
                                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
                    const userValues = [user_name, first_name, last_name, email, phone_number, password_hash, user_role_id, mediaResult.insertId, address_1, landmark, state, city, pincode, 0, add_id, edit_id, 1];
    
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
                const userQuery = `INSERT INTO roh_users (user_name, first_name, last_name, email, phone_number, password_hash, user_role_id, profile_picture_url, address_1, landmark, state, city, pincode, verified, add_id, edit_id, active) 
                                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
                const userValues = [user_name, first_name, last_name, email, phone_number, password_hash, user_role_id, null, address_1, landmark, state, city, pincode, 0, add_id, edit_id, 1];
    
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
            const page = parseInt(req.body.page) || 1; // Default to page 1
            const limit = parseInt(req.body.limit) || 10; // Default limit 10
            const offset = (page - 1) * limit;

            // Capture filter parameters
            const userName = req.body.user_name || '';
            const userRoleId = req.body.user_role_id || '';
            const active = req.body.active !== undefined ? req.body.active : ''; // Empty string means no filter

            const connection = pool.promise();

            // Modified query to include pagination directly
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

            // Adding pagination to query (LIMIT and OFFSET)
            query += ' LIMIT ? OFFSET ?';
            queryParams.push(limit, offset);

            // Execute query with pagination
            const [paginatedUsers] = await connection.execute(query, queryParams);
            // console.log('Paginated users:', paginatedUsers);

            // To get the total count for pagination, do a second query for count
            let countQuery = `SELECT COUNT(*) AS total FROM roh_users WHERE 1=1`;
            let countQueryParams = [];
            
            // Adding filters to count query
            if (userName) {
                countQuery += ` AND (user_name LIKE ? OR first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR phone_number LIKE ?)`;
                countQueryParams.push(likeValue, likeValue, likeValue, likeValue, likeValue);
            }

            if (userRoleId) {
                countQuery += ' AND user_role_id = ?';
                countQueryParams.push(userRoleId);
            }

            if (active !== '') {
                countQuery += ' AND active = ?';
                countQueryParams.push(active);
            }

            // Get total count of filtered users
            const [totalResult] = await connection.execute(countQuery, countQueryParams);
            const total = totalResult[0].total;
            const totalPages = Math.ceil(total / limit);

            // If no users at all or if page exceeds total pages
            if (total === 0 || page > totalPages) {
                return GLOBAL_SUCCESS_RESPONSE("No users found", {
                    users: [],
                    page,
                    limit,
                    total,
                    totalPages
                }, res);
            }

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
        password_hash,           // plain text password input
        profile_picture_url,     // existing media id or null
        address_1,
        landmark,
        state,
        city,
        pincode,
        edit_id,
        } = req.body;

        if (!user_id) {
        return GLOBAL_ERROR_RESPONSE("user_id is required", null, res);
        }

        // Helper to normalize empty strings to null
        const toNullIfEmpty = (v) => (v === undefined || v === null || (typeof v === "string" && v.trim() === "") ? null : v);

        // Build dynamic update parts to avoid forcing empty strings into DB
        const setClauses = [];
        const params = [];

        const addSet = (clause, value) => {
        setClauses.push(clause);
        params.push(value);
        };

        if (first_name !== undefined) addSet("first_name = ?", toNullIfEmpty(first_name));
        if (last_name !== undefined) addSet("last_name = ?", toNullIfEmpty(last_name));
        if (email !== undefined) addSet("email = ?", toNullIfEmpty(email));
        if (phone_number !== undefined) addSet("phone_number = ?", toNullIfEmpty(phone_number));
        if (user_role_id !== undefined) addSet("user_role_id = ?", toNullIfEmpty(user_role_id));

        // Password hash only if provided and valid
        if (password_hash !== undefined && password_hash !== null && String(password_hash).trim() !== "") {
        const pwd = String(password_hash).trim();
        if (pwd.length < 8) {
            return GLOBAL_ERROR_RESPONSE("Password must be at least 8 characters long", null, res);
        }
        const hashedPassword = await bcrypt.hash(pwd, 10);
        addSet("password_hash = ?", hashedPassword);
        }

        // Handle profile picture:
        // - If new file uploaded -> insert into media gallery and use insertId
        // - Else, if profile_picture_url provided (could be null) -> set accordingly
        let finalProfileId = undefined;

        if (req.file) {
        const fileExtension = path.extname(req.file.filename);
        const mediaQuery = `INSERT INTO roh_media_gallery (file_name, file_path, file_type, active) VALUES (?, ?, ?, ?)`;
        const mediaValues = [req.file.filename, `/media/users/profile/`, fileExtension.slice(1), 1];
        const [mediaResult] = await pool.promise().query(mediaQuery, mediaValues);
        finalProfileId = mediaResult.insertId;
        } else if (profile_picture_url !== undefined) {
        // normalize: if empty string or "null" string, set to actual NULL
        const normalized =
            profile_picture_url === null ||
            (typeof profile_picture_url === "string" && profile_picture_url.trim().toLowerCase() === "null") ||
            (typeof profile_picture_url === "string" && profile_picture_url.trim() === "")
            ? null
            : profile_picture_url;
        finalProfileId = normalized;
        }

        if (finalProfileId !== undefined) {
        addSet("profile_picture_url = ?", finalProfileId);
        }

        // Optional address fields:
        // Use NULL when empty string; also guard numeric type for pincode
        if (address_1 !== undefined) addSet("address_1 = ?", toNullIfEmpty(address_1));
        if (landmark !== undefined) addSet("landmark = ?", toNullIfEmpty(landmark));
        if (state !== undefined) addSet("state = ?", toNullIfEmpty(state));
        if (city !== undefined) addSet("city = ?", toNullIfEmpty(city));

        if (pincode !== undefined) {
        let normalizedPin = toNullIfEmpty(pincode);
        // If provided and not null, coerce to number; if NaN, reject
        if (normalizedPin !== null) {
            const num = Number(normalizedPin);
            if (!Number.isInteger(num)) {
            return GLOBAL_ERROR_RESPONSE("Invalid pincode: must be an integer", null, res);
            }
            normalizedPin = num;
        }
        addSet("pincode = ?", normalizedPin);
        }

        if (edit_id !== undefined) addSet("edit_id = ?", toNullIfEmpty(edit_id));

        if (setClauses.length === 0) {
        return GLOBAL_SUCCESS_RESPONSE("Nothing to update", {}, res);
        }

        const sql = `
        UPDATE roh_users
        SET ${setClauses.join(", ")}
        WHERE user_id = ?
        `;

        params.push(user_id);

        const [result] = await pool.promise().query(sql, params);
        return GLOBAL_SUCCESS_RESPONSE("User updated successfully", result, res);
    } catch (err) {
        console.error("Unexpected error:", err);
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

