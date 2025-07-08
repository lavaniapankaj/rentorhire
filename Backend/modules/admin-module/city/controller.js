const { pool } = require('../../../config/connection');  // Correct import of the pool

function CityApi() {
    /** Add new city to cities collection Coded by Vishnu July 05 2025 */
    this.AddnewCity = (req, res) => {
        try {
            const { city_name, city_slug, state_id, add_id = 1, edit_id = 1 } = req.body;

            /** SQL query to add a new city */
            const query = `
                INSERT INTO roh_cities (city_name, city_slug, state_id, add_id, edit_id, active)
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            /** Proceed with inserting the city into the database */
            pool.execute(query, [city_name, city_slug, state_id, add_id, edit_id, 1], (err, result) => {
                if (err) {
                    return GLOBAL_ERROR_RESPONSE("Error saving city", err, res);
                }

                /** If successful, return the inserted ID */
                return GLOBAL_SUCCESS_RESPONSE("City added successfully", { id: result.insertId }, res);
            });

        } catch (err) {
            console.error("Error in AddnewCity:", err);  // Log the error for debugging
            return GLOBAL_ERROR_RESPONSE("Internal server error", err, res);
        }
    };

    /** Get all cities from cities collection Coded by Vishnu July 05 2025 */
    this.GetallCity = (req, res) => {
        try {
            const page = parseInt(req.body.page) || 1;
            const limit = parseInt(req.body.limit) || 10;
            const offset = (page - 1) * limit;
    
            const query = `
                SELECT * FROM roh_cities WHERE active = 1 LIMIT ? OFFSET ?
            `;
    
            pool.query(query, [limit, offset], (err, result) => {
                if (err) {
                    return GLOBAL_ERROR_RESPONSE("Error getting cities", err, res);
                }
    
                if (result.length === 0) {
                    return GLOBAL_ERROR_RESPONSE("No active cities found", {}, res);
                }
    
                return GLOBAL_SUCCESS_RESPONSE("Cities fetched successfully", result, res);
            });
        } catch (err) {
            console.error("Error in GetallCity:", err);
            return GLOBAL_ERROR_RESPONSE("Internal server error", err, res);
        }
    };
    

    /** Edit city in cities collection Coded by Vishnu July 05 2025 */
    this.EditCity = (req, res) => {
        try {
            const { city_id, city_name, city_slug, state_id } = req.body;

            /** SQL query to update the city */
            const query = `
                UPDATE roh_cities SET city_name = ?, city_slug = ?, state_id = ? WHERE city_id = ?
            `;

            /** Proceed with updating the city in the database */
            pool.query(query, [city_name, city_slug, state_id, city_id], (err, result) => {
                if (err) {
                    return GLOBAL_ERROR_RESPONSE("Error updating city", err, res);
                }

                /** If successful, return the updated city */
                return GLOBAL_SUCCESS_RESPONSE("City updated successfully", result, res);
            });

        } catch (err) {
            console.error("Error in EditCity:", err);  /** Log the error for debugging */
            return GLOBAL_ERROR_RESPONSE("Internal server error", err, res);
        }
    };

    /** Delete city in cities collection Coded by Vishnu July 05 2025 */
    this.DeleteCity = (req, res) => {
        try {
            const { city_id } = req.body;

            /** SQL query to update the city (set active = 0 to mark it as deleted) */
            const query = `
                UPDATE roh_cities SET active = 0 WHERE city_id = ?
            `;

            /** Proceed with deleting the city in the database */
            pool.query(query, [city_id], (err, result) => {
                if (err) {
                    return GLOBAL_ERROR_RESPONSE("Error deleting city", err, res);
                }

                /** If no rows were affected, it means the city ID does not exist */
                if (result.affectedRows === 0) {
                    return GLOBAL_ERROR_RESPONSE("No city found with the given ID", {}, res);
                }

                /** If the city was successfully deleted, return a success response */
                return GLOBAL_SUCCESS_RESPONSE("City deleted successfully", result, res);
            });

        } catch (err) {
            console.error("Error in DeleteCity:", err);  /** Log the error for debugging */
            return GLOBAL_ERROR_RESPONSE("Internal server error", err, res);
        }
    };
}

module.exports = new CityApi();
