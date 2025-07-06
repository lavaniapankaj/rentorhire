const { pool } = require('../../../config/connection');  /** Import the pool */

function StateApi() {
    /** Add new state in state collection Coded by Vishnu July 03 2025 */
    this.AddnewState = async (req, res) => {
        try {
            const { state_name, state_slug, add_id = 1, edit_id = 1 } = req.body;

            /** If validation passes, proceed with inserting the new state */
            const query = `
                INSERT INTO roh_states (state_name, state_slug, add_id, edit_id, active)
                VALUES (?, ?, ?, ?, ?)
            `;

            /** Proceed with inserting the state into the database */
            pool.execute(query, [state_name, state_slug, add_id, edit_id, 1], (err, result) => {
                if (err) {
                    return GLOBAL_ERROR_RESPONSE("Error saving state", err, res);
                }

                return GLOBAL_SUCCESS_RESPONSE("State added successfully", { id: result.insertId }, res);
            });

        } catch (err) {
            return GLOBAL_ERROR_RESPONSE("Internal server error", err, res);
        }
    };

    /** Get all state in state collection Coded by Vishnu July 04 2025 */
    this.GetallState = async (req, res) => {
        try {
            /** Get page and limit from query parameters (defaults if not provided) */
            const page = parseInt(req.query.page) || 1; /** page 1 if not provided */
            const limit = parseInt(req.query.limit) || 5; /**  5 items per page */

            /** Calculate the offset for pagination */
            const offset = (page - 1) * limit;

            /** SQL query to fetch states with pagination */
            const query = `
                SELECT * FROM roh_states WHERE active = 1 LIMIT ? OFFSET ?
            `;

            /** Execute the query to get the paginated states */
            pool.query(query, [limit, offset], (err, result) => {
                if (err) {
                    return GLOBAL_ERROR_RESPONSE("Error getting states", err, res);
                }

                /** Return paginated results */
                return GLOBAL_SUCCESS_RESPONSE("States fetched successfully", result, res);
            });
        } catch (err) {
            return GLOBAL_ERROR_RESPONSE("Internal server error", err, res);
        }
    };

    /** Edit state in state collection Coded by Vishnu July 04 2025 */
    this.EditState = async (req, res) => {
        try {
            const { state_id, state_name, state_slug, add_id = 1, edit_id = 1 } = req.body;

            /** Update the state */
            const query = `
                UPDATE roh_states SET state_name = ?, state_slug = ?, add_id = ?, edit_id = ?, active = ? WHERE state_id = ?
            `;

            pool.query(query, [state_name, state_slug, add_id, edit_id, 1, state_id], (err, result) => {
                if (err) {
                    return GLOBAL_ERROR_RESPONSE("Error updating state", err, res);
                }
                return GLOBAL_SUCCESS_RESPONSE("State updated successfully", result, res);
            });
        } catch (err) {
            return GLOBAL_ERROR_RESPONSE("Internal server error", err, res);
        }
    };

    /** Delete state in state collection Coded by Vishnu July 04 2025 */
    this.DeleteState = (req, res) => {
        try {
            const { state_id } = req.body;

            /** SQL query to update the state (set active = 0 to mark it as deleted) */
            const query = `
                UPDATE roh_states SET active = 0 WHERE state_id = ?
            `;

            /** Use the callback approach for handling the query */
            pool.query(query, [state_id], (err, result) => {
                if (err) {
                    return GLOBAL_ERROR_RESPONSE("Error deleting state", err, res);
                }

                /** If no rows were affected, it means the state ID does not exist */
                if (result.affectedRows === 0) {
                    return GLOBAL_ERROR_RESPONSE("No state found with the given ID", {}, res);
                }

                /** If the state was successfully updated, return a success response */
                return GLOBAL_SUCCESS_RESPONSE("State deleted successfully", result, res);
            });

        } catch (err) {
            console.error("Error in DeleteState:", err);  /** Log the error for debugging */
            return GLOBAL_ERROR_RESPONSE("Internal server error", err, res);
        }
    };
}

module.exports = new StateApi();
