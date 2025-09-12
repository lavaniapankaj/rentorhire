const pool = require('../../config/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function userModuleApi() {

    /** Get user detiles coded by vishnu August 14 2025 */
    this.getUserDetails = async (req, res, next) => {
        try {
            const { user_id } = req.body;

            if (!user_id) {
                return res.status(400).json({ message: 'user_id is required' });
            }

            const [rows] = await pool.query(
                `SELECT 
                    user_id,
                    user_name,
                    first_name,
                    last_name,
                    email,
                    phone_number,
                    user_role_id,
                    profile_picture_url,
                    is_service_provider,
                    address_1,
                    landmark,
                    state,
                    city,
                    pincode,
                    add_date
                FROM roh_users
                WHERE user_id = ?`,
                [user_id]
            );

            if (rows.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json(rows[0]); // send only the selected fields
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    /** Edit user detiles coded by vishnu August 14 2025 */
    this.editUserDetails = async (req, res, next) => {
        try {
            const { user_id, first_name, last_name, phone_number, address_1, landmark, state, city, pincode } = req.body;

            if (!user_id) {
                return res.status(400).json({ message: 'user_id is required' });
            }

            const [rows] = await pool.query(
                `UPDATE roh_users
                SET  first_name = ?, last_name = ?, phone_number = ?, address_1 = ?, landmark = ?, state = ?, city = ?, pincode = ?
                WHERE user_id = ?`,
                [first_name, last_name, phone_number, address_1, landmark, state, city, pincode, user_id]
            );

            if (rows.affectedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json({ message: 'User details updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };
    

}

module.exports = new userModuleApi();
