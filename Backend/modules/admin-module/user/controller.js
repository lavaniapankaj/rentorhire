const { pool } = require('../../../config/connection');  /** Import the pool */

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
            add_id = 1,
            edit_id = 1
          } = req.body;
      
          const query = `
            INSERT INTO roh_users (
              user_name, first_name, last_name, email, phone_number, password_hash,
              user_role_id, profile_picture_url, address_1, landmark, state, city,
              pincode, add_id, edit_id, active
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;
      
          const values = [
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
            edit_id,
            1
          ];
      
          pool.execute(query, values, (err, result) => {
            if (err) return GLOBAL_ERROR_RESPONSE("Error saving user", err, res);
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
    
            // Capture filter parameters
            const userName = req.body.user_name || '';
            const userRoleId = req.body.user_role_id || '';
            const active = req.body.active !== undefined ? req.body.active : '';  // Empty string means no filter
    
            const connection = pool.promise();
    
            // Fetch all users without pagination first
            let query = `SELECT user_id, user_name, first_name, last_name, email, phone_number, user_role_id, add_id, edit_id, active FROM roh_users WHERE 1=1`;
            let queryParams = [];
    
            if (userName) {
                query += ' AND user_name LIKE ?';
                queryParams.push(`%${userName}%`);
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
                profile_picture_url,
                address_1,
                landmark,
                state,
                city,
                pincode,
                edit_id = 1
            } = req.body;
    
            const query = `
                UPDATE roh_users 
                SET first_name = ?, 
                    last_name = ?, 
                    email = ?, 
                    phone_number = ?, 
                    user_role_id = ?, 
                    password_hash = ?, 
                    profile_picture_url = ?,
                    address_1 = ?, 
                    landmark = ?, 
                    state = ?, 
                    city = ?, 
                    pincode = ?, 
                    edit_id = ?, 
                    active = ?
                WHERE user_id = ?
            `;
    
            const params = [
                first_name,
                last_name,
                email,
                phone_number,
                user_role_id,
                password_hash,
                profile_picture_url,
                address_1,
                landmark,
                state,
                city,
                pincode,
                edit_id,
                1, /** active */
                user_id
            ];
    
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
