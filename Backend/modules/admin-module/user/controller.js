const { pool } = require('../../../config/connection');  /** Import the pool */

function UsersApi() {
    /** Add new user in roh_users table Coded by Vishnu July 06 2025 */
    this.AddnewUser = async (req, res) => {
        try {
            const { user_name, first_name, last_name, email, phone_number, password_hash, user_role_id, add_id = 1, edit_id = 1 } = req.body;

            /** If validation passes, proceed with inserting the new user */
            const query = `
                INSERT INTO roh_users (user_name, first_name, last_name, email, phone_number, password_hash, user_role_id, add_id, edit_id, active)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            /** Proceed with inserting the user into the database */
            pool.execute(query, [user_name, first_name, last_name, email, phone_number, password_hash, user_role_id, add_id, edit_id, 1], (err, result) => {
                if (err) {
                    return GLOBAL_ERROR_RESPONSE("Error saving user", err, res);
                }

                return GLOBAL_SUCCESS_RESPONSE("User added successfully", { id: result.insertId }, res);
            });

        } catch (err) {
            return GLOBAL_ERROR_RESPONSE("Internal server error", err, res);
        }
    };

    /** Get all users in roh_users table Coded by Vishnu July 07 2025 */
    this.GetAllUsers = async (req, res) => {
        try {
            const page = parseInt(req.body.page) || 1;
            const limit = parseInt(req.body.limit) || 10;
            const offset = (page - 1) * limit;
    
            const connection = pool.promise();
    
            // Total count
            const [countResult] = await connection.execute(`SELECT COUNT(*) as total FROM roh_users`);
            const total = countResult[0].total;
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
    
            // Paginated fetch
            const [users] = await connection.execute(
                `
                SELECT user_id, user_name, first_name, last_name, email, phone_number, user_role_id, add_id, edit_id, active
                FROM roh_users
                LIMIT ? OFFSET ?
                `,
                [limit, offset]
            );
    
            return GLOBAL_SUCCESS_RESPONSE("Users fetched successfully", {
                users,
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
                edit_id = 1
            } = req.body;
    
            /** Build dynamic SQL parts */
            let query = `
                UPDATE roh_users 
                SET first_name = ?, last_name = ?, email = ?, phone_number = ?, user_role_id = ?,password_hash = ?, edit_id = ?, active = ?
            `;
            const params = [first_name, last_name, email, phone_number, user_role_id,password_hash, edit_id, 1];
    
            
            /** Final WHERE clause */
            query += ` WHERE user_id = ?`;
            params.push(user_id);
    
            pool.query(query, params, (err, result) => {
                if (err) {
                    return GLOBAL_ERROR_RESPONSE("Error updating user", err, res);
                }
                return GLOBAL_SUCCESS_RESPONSE("User updated successfully", result, res);
            });
    
        } catch (err) {
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
            const { user_id } = req.body;
    
            const query = `SELECT * FROM roh_users WHERE user_id = ?`;
    
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
