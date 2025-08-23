const pool = require('../../../config/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const path = require('path');



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

    /** Main Api for Become a host Add new vehicle Coded by Vishnu August 22 2025 */
    this.addNewVehicle = async (req, res) => {
        const connection = await pool.getConnection();
        try {
            const {
            service_provider_id,
            item_name,
            vehicle_description,
            category_id,
            tag_id,
            brand_id,
            model_id,
            price_per_day,
            price_per_week,
            price_per_month,
            price_custom_day,
            item_status,
            admin_item_status,
            total_views,
            security_deposit,
            booking_terms,
            availability_status,
            /** Attributes table fields */
            engine_type,
            transmission_type,
            fuel_consumption,
            seating_capacity,
            color,
            vehicle_age,
            mileage,
            registration_number,
            insurance_validity,
            vehicle_type,
            rental_period,
            vehicle_condition,
            accessories,
            address_1,
            landmark,
            item_state,
            city,
            pincode,
            booking_instructions
            } = req.body;

            /** Basic validations */
            if (!service_provider_id) return res.status(400).json({ message: 'service_provider_id is required' });
            if (!item_name) return res.status(400).json({ message: 'item_name is required' });

            /** Start transaction */
            await connection.beginTransaction();

            /** 1) Save uploaded images into roh_media_gallery and collect their IDs */
            const files = Array.isArray(req.files) ? req.files : [];
            const mediaQuery = `INSERT INTO roh_media_gallery (file_name, file_path, file_type, active) VALUES (?, ?, ?, ?)`;

            const mediaIds = [];
            const staticPathForDB = '/media/host/items/';

            for (const f of files) {
            // file_type: try MIME last part or fall back to file extension
            const extFromMime = (f.mimetype && f.mimetype.includes('/')) ? f.mimetype.split('/')[1] : null;
            const extFromName = path.extname(f.originalname).replace('.', '') || null;
            const fileType = extFromMime || extFromName || 'bin';

            const [ins] = await connection.query(mediaQuery, [
                f.filename,               // file_name
                staticPathForDB,          // file_path (static, as required)
                fileType,                 // file_type (jpg/jpeg/png/webp...)
                1                         // active
            ]);
            mediaIds.push(ins.insertId);
            }

            /** 2) image_ids JSON (store DB IDs) */
            const imagesJson = JSON.stringify(mediaIds); // e.g., [12,13,14]

            /** 3) Insert into roh_vehicle_details */
            const [vehicleResult] = await connection.query(
            `INSERT INTO roh_vehicle_details 
                (service_provider_id, item_name, vehicle_description, category_id, tag_id, brand_id, model_id, image_ids, price_per_day, price_per_week, price_per_month, price_custom_day, item_status, admin_item_status, total_views, security_deposit, booking_terms, availability_status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                service_provider_id,
                item_name,
                vehicle_description || null,
                category_id || null,
                tag_id || null,
                brand_id || null,
                model_id || null,
                imagesJson, // <— yahan JSON array of media IDs
                price_per_day || null,
                price_per_week || null,
                price_per_month || null,
                price_custom_day || null,
                item_status || 1,
                admin_item_status || 0,
                total_views || 0,
                security_deposit || null,
                booking_terms || null,
                availability_status || 1
            ]
            );

            const vehicle_id = vehicleResult.insertId;

            /** 4) Insert into roh_vehicle_attributes */
            await connection.query(
            `INSERT INTO roh_vehicle_attributes
                (vehicle_id, engine_type, transmission_type, fuel_consumption, seating_capacity, color, vehicle_age, mileage, registration_number, insurance_validity, vehicle_type, rental_period, vehicle_condition, accessories, address_1, landmark, item_state, city, pincode, booking_instructions)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                vehicle_id,
                engine_type || null,
                transmission_type || null,
                fuel_consumption || null,
                seating_capacity || null,
                color || null,
                vehicle_age || null,
                mileage || null,
                registration_number || null,
                insurance_validity || null,
                vehicle_type || null,
                rental_period || null,
                vehicle_condition || null,
                accessories || null,
                address_1 || null,
                landmark || null,
                item_state || null,
                city || null,
                pincode || null,
                booking_instructions || null
            ]
            );

            /** Commit */
            await connection.commit();
            connection.release();

            return res.status(200).json({
            message: 'Vehicle and attributes added successfully',
            vehicle_id,
            image_ids: mediaIds // helpful response
            });

        } catch (error) {
            try { await connection.rollback(); } catch (e) {}
            try { connection.release(); } catch (e) {}
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };


}

module.exports = new hostModuleApi();