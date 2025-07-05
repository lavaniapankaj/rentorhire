// controller.js
const pool = require('../../../config/connection');  // Correct import of the promisePool


const util = require('util');
const query = util.promisify(pool.query).bind(pool);


function CategoryApi() {

    /** Function method to create the category and sub-category Coded by Raj June 04 2025 */
    this.createCategory = async (req, res) => {
        try {
            const { name, description, add_id, edit_id, parent_category_id} = req.body;
            const active = 1;
            const slug = name
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')  /* remove non-word characters */
                .replace(/\s+/g, '-')      /* replace spaces with hyphens */
                .replace(/--+/g, '-');     /* remove double hyphens */
                
            /** SQL query to insert data into the categories table */
            const sql = `INSERT INTO roh_categories (name, description, active, add_id, edit_id, parent_category_id, slug)
                VALUES (?, ?, ?, ?, ?, ?, ?)`;

            /* Execute the query using the pool */
            const [result] = await pool.query(sql, [
                name, 
                description, 
                active,
                add_id,
                edit_id,
                parent_category_id,
                slug
            ]);

            if (result.affectedRows === 1) {
                return GLOBAL_SUCCESS_RESPONSE(
                    "Category successfully created.",
                    {},
                    res
                );
            } else {
                return GLOBAL_ERROR_RESPONSE("Failed to insert category.", {}, res);
            }

        } catch (err) {
            let message = "Internal server error";
            /** MySQL errors like duplicate entries for slug */
            if (err.code === 'ER_DUP_ENTRY') {
                message = "Duplicate Category Slug.";
            }
            return GLOBAL_ERROR_RESPONSE(message, err, res);
        }
    };

    /** Category list Coded by Raj June 04 2025 */
    this.categoryList = async (req, res) => {
        try{
            /** Get page and limit from query parameters (defaults if not provided) */
            const page = parseInt(req.query.page) || 1; /** page 1 if not provided */
            const limit = parseInt(req.query.limit) || 5; /**  5 items per page */

            /** Calculate the offset for pagination */
            const offset = (page - 1) * limit;
            
            const sql = "SELECT c.id, c.name, c.description, c.slug, c.parent_category_id, p.name AS parent_category_name FROM roh_categories c LEFT JOIN roh_categories p ON c.parent_category_id = p.id WHERE c.active = 1 LIMIT ? OFFSET ?";

            const [categoryList] = await pool.query(sql, [parseInt(limit), parseInt(offset)]);

            if (categoryList) {
                return GLOBAL_SUCCESS_RESPONSE(
                    "Category data fetched.",
                    categoryList,
                    res
                );
            } else {
                return GLOBAL_ERROR_RESPONSE("Failed to fetch category data.", {}, res);
            }
        } catch(error){
            let message = "Internal server error";
            return GLOBAL_ERROR_RESPONSE(message, error, res);
        }
    }

    /** Details Category Coded by Raj June 04 2025 */
    this.categoryDetail = async (req, res) => {
        try {
            const { id } = req.body;    
            const sql = "SELECT * FROM roh_categories WHERE id = ?";
            const [rows] = await pool.query(sql, [id]);
    
            if (rows.length === 0) {
                return GLOBAL_ERROR_RESPONSE("Category not found.", {}, res);
            }
    
            return GLOBAL_SUCCESS_RESPONSE("Category details fetched successfully.", rows[0], res);
        } catch (error) {
            console.error("Error fetching category details:", error);
            return GLOBAL_ERROR_RESPONSE("Internal server error.", {}, res);
        }
    };    

    /** Update category Coded by Raj June 04-05 2025 */
    this.updateCategory = async (req, res) => {
        try {
            const { id, name, description, parent_category_id, edit_id } = req.body;
    
            /** Generate slug from name */
            const slug = name
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/--+/g, '-');
    
            const sql = `UPDATE roh_categories SET name = ?, description = ?, parent_category_id = ?, edit_id = ? WHERE id = ?`;
    
            console.log("Executing query...");
    
            // Await the result of the query
            const result = await query(sql, [name, description, parent_category_id, edit_id, id]);
    
            console.log("Query result:", result);
    
            if (result.affectedRows === 0) {
                return GLOBAL_ERROR_RESPONSE("Category not found or not updated.", {}, res);
            }
    
            return GLOBAL_SUCCESS_RESPONSE(
                "Category updated successfully.",
                { id, name, slug, parent_category_id },
                res
            );
    
        } catch (err) {
            console.error("Caught error:", err);
            return GLOBAL_ERROR_RESPONSE("Internal server error.", err, res);
        }
    };

    // this.updateCategory = async (req, res) => {
    //     try {
    //         const {id, name, description, parent_category_id, edit_id} = req.body;
    
    //         /** Generate slug from name */
    //         const slug = name
    //             .toLowerCase()
    //             .trim()
    //             .replace(/[^\w\s-]/g, '')
    //             .replace(/\s+/g, '-')
    //             .replace(/--+/g, '-');
    
    //         const sql = `UPDATE roh_categories SET name = ?, description = ?, parent_category_id = ?, edit_id = ? WHERE id = ?`;
            
    //         console.log("before executing.");

    //         pool.query(sql, [name, description, parent_category_id, edit_id, id], (err, result) => {

    //             console.log("err>> ", err);
    //             console.log("result>> ", result);

    //             if (err) {
    //                 console.error("Error updating category:", err);
    //                 return GLOBAL_ERROR_RESPONSE("Error updating category", err, res);
    //             }
            
    //             if (result.affectedRows === 0) {
    //                 return GLOBAL_ERROR_RESPONSE("Category not found or not updated.", {}, res);
    //             }
            
    //             return GLOBAL_SUCCESS_RESPONSE(
    //                 "Category updated successfully.",
    //                 { id, name, slug, parent_category_id },
    //                 res
    //             );
    //         });
            
    //     } catch (err) {
    //         return GLOBAL_ERROR_RESPONSE("Internal server error.", err, res);
    //     }
    // };
    
    /** Delete category Coded by Raj June 05 2025 */
    this.deleteCategory = (req, res) => {
        try {
            const { id } = req.body;

            /** SQL query to update the category (set active = 0 to mark it as deleted) */
            const query = `UPDATE roh_categories SET active = 0 WHERE id = ?`;

            /** Use the callback approach for handling the query */
            pool.query(query, [id], (err, result) => {
                if (err) {
                    return GLOBAL_ERROR_RESPONSE("Error deleting category.", err, res);
                }

                /** If no rows were affected, it means the category ID does not exist */
                if (result.affectedRows === 0) {
                    return GLOBAL_ERROR_RESPONSE("No category found with the given ID", {}, res);
                }

                /** If the category was successfully updated, return a success response */
                return GLOBAL_SUCCESS_RESPONSE("Category deleted successfully", result, res);
            });

        } catch (err) {
            console.error("Error in Delete Category:", err);  /** Log the error for debugging */
            return GLOBAL_ERROR_RESPONSE("Internal server error", err, res);
        }
    };

}
module.exports = new CategoryApi();
