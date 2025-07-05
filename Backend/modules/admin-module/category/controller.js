// controller.js
const pool = require('../../../config/connection');  // Correct import of the promisePool
const util = require('util');
const query = util.promisify(pool.query).bind(pool);


function CategoryApi() {

    /** Function method to create the category and sub-category */
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

    this.categoryList = async (req, res) => {
        try{
            const sql = "SELECT id, name, description, slug FROM roh_categories";
            const [categoryList] = await pool.query(sql);

            if(categoryList){
                return GLOBAL_SUCCESS_RESPONSE(
                    "Category data fetched.",
                    categoryList, // Send fetched data here
                    res
                )
            } else {
                return GLOBAL_ERROR_RESPONSE("Failed to insert category.", {}, res);
            }
        } catch(error){
            let message = "Internal server error";
            return GLOBAL_ERROR_RESPONSE(message, error, res);
        }
    }

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
    

}
module.exports = new CategoryApi();
