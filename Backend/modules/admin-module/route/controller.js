const { pool } = require('../../../config/connection');  /** Import the pool */

function RoutesApi() {
    /** Add new Route in roh_routes table Coded by Vishnu July 07 2025 */
    this.AddNewAdminRoute = async (req, res) => {
        try {
            const {
                route_name,
                access_type,
                route_type,
                group_name,
                add_id = 1,
                edit_id = 1
            } = req.body;
    
            /** SQL insert query for roh_routes */
            const query = `
                INSERT INTO roh_routes (
                    route_name,
                    access_type,
                    route_type,
                    group_name,
                    add_id,
                    edit_id,
                    active
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
    
            /** Execute the query */
            pool.execute(
                query,
                [route_name, access_type, route_type, group_name, add_id, edit_id, 1],
                (err, result) => {
                    if (err) {
                        return GLOBAL_ERROR_RESPONSE("Error saving route", err, res);
                    }
    
                    return GLOBAL_SUCCESS_RESPONSE("Route added successfully", { id: result.insertId }, res);
                }
            );
    
        } catch (err) {
            return GLOBAL_ERROR_RESPONSE("Internal server error", err, res);
        }
    };
    


    
    
    
}

module.exports = new RoutesApi();
