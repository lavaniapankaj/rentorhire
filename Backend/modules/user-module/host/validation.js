const { pool } = require("../../../config/connection");

/** Validate get all active parent category - Coded by Vishnu August 19 2025 */
const ValidategetUserActivecategory = async (req, res, next) => {
    try {
        next();
    } catch (err) {
        console.error("Validation error:", err);
        return GLOBAL_ERROR_RESPONSE("Validation error", { error: err.message || err }, res);
    }
}

/** Validate get all active child category - Coded by Vishnu August 20 2025 */
const ValidategetUserActivechildcategory = async (req, res, next) => {
    try {
        const { parent_category_id } = req.body;

        if (!parent_category_id || isNaN(parent_category_id)) {
            return res.status(400).json({
                success: false,
                message: "No data found",
                error: "Valid parent_category_id is required"
            });
        }

        next();
    } catch (err) {
        console.error("Validation error:", err);
        return GLOBAL_ERROR_RESPONSE("Validation error", { error: err.message || err }, res);
    }
};

/** Validate get all active child category brands - Coded by Vishnu August 20 2025 */
const ValidategetUserActivechildcategorybrands = async (req, res, next) => {
    try {
        const { child_category_id } = req.body;
            if (!child_category_id || isNaN(child_category_id)) {
            return res.status(400).json({
                success: false,
                message: "No data found",
                error: "Valid Child category id is required"
            });
        }

        next();
    } catch (err) {
        console.error("Validation error:", err);
        return GLOBAL_ERROR_RESPONSE("Validation error", { error: err.message || err }, res);
    }
};

/** validate get all active child category brands model - Coded by Vishnu August 21 2025 */
const ValidategetUserActivechildcategorybrandsmodel = async (req, res, next) => {
    try {
        const { brand_id } = req.body;

        if (!brand_id || isNaN(brand_id)) {
            return res.status(400).json({
                success: false,
                message: "No data found",
                error: "Valid Brand id is required"
            });
        }

        next();
    } catch (err) {
        console.error("Validation error:", err);
        return GLOBAL_ERROR_RESPONSE("Validation error", { error: err.message || err }, res);
    }
};

/** validate main api for become a host for add new vehicle - Coded by Vishnu August 22 2025 */
const ValidateHostAddNewVehicle = async (req, res, next) => {
    try {
        next();
    } catch (err) {
        console.error("Validation error:", err);
        return GLOBAL_ERROR_RESPONSE("Validation error", { error: err.message || err }, res);
    }
};


module.exports = {ValidategetUserActivecategory, ValidategetUserActivechildcategory, ValidategetUserActivechildcategorybrands, ValidategetUserActivechildcategorybrandsmodel, ValidateHostAddNewVehicle};