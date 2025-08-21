const pool = require('../../../config/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function hostModuleApi() {

    /** get all active parent category Coded by Vishnu August 19 2025 */
    this.getAllActiveCategory = async (req, res) => {
        try {
            const [rows] = await pool.query(
                'SELECT id, name, slug, parent_category_id FROM `roh_categories` WHERE `active` = 1 AND `parent_category_id` IS NULL'
            );
            res.status(200).json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };


    /** get all active child category Coded by Vishnu August 20 2025 */
    this.getAllActiveChildCategory = async (req, res) => {
        try {
            const { parent_category_id } = req.body;

            if (!parent_category_id) {
                return res.status(400).json({ message: 'parent_category_id is required' });
            }

            const [rows] = await pool.query(
                'SELECT id, name, slug, parent_category_id FROM `roh_categories` WHERE `active` = 1 AND `parent_category_id` = ?',
                [parent_category_id]
            );

            res.status(200).json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    /** get all active child category active brands Coded by Vishnu August 20 2025 */
    this.getAllChildCategoryBrands = async (req, res) => {
        try {
            const { child_category_id } = req.body;

            if (!child_category_id || isNaN(child_category_id)) {
                return res.status(400).json({ message: 'Valid Category id is required' });
            }

            const [rows] = await pool.query(
                'SELECT id, brand_name, cat_id FROM roh_brands WHERE active = 1 AND cat_id = ?',
                [child_category_id]
            );

            if (rows.length === 0) {
                return res.status(404).json({ message: 'No brands found for given category' });
            }

            res.status(200).json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    /** get all active child category active brands model Coded by Vishnu August 21 2025 */
    this.getAllChildCategoryBrandsModel = async (req, res) => {
        try {
            const { brand_id } = req.body;

            if (!brand_id || isNaN(brand_id)) {
                return res.status(400).json({ message: 'Valid Brand id is required' });
            }

            const [rows] = await pool.query(
                'SELECT id, model_name, brand_id, tag_id FROM roh_models WHERE active = 1 AND brand_id = ?',
                [brand_id]
            );

            if (rows.length === 0) {
                return res.status(404).json({ message: 'No models found for given brand' });
            }

            res.status(200).json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };


}

module.exports = new hostModuleApi();