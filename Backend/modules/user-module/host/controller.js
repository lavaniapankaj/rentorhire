const pool = require('../../../config/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function hostModuleApi() {

    /** get all active category Coded by Vishnu August 19 2025 */
    this.getAllActiveCategory = async (req, res) => {
        try {
            const [rows] = await pool.query('SELECT id, name, slug, parent_category_id FROM `roh_categories` WHERE `active` = 1');
            res.status(200).json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

}

module.exports = new hostModuleApi();