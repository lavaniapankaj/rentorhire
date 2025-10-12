// controller.js
const pool = require('../../../config/connection');
const path = require('path');

function CategoryApi() {

    /** Function method to create the category and sub-category Coded by Raj July 04 2025 */
    this.createCategory = async (req, res) => {
        try {

            const { name, description, add_id, edit_id, parent_category_id, category_picture_file } = req.body;
            const active = 1;
            let mediaId = null;

            /** If the user hasn't uploaded an image, set category_picture_file to null */
            let categoryImageName = null;
            let categoryImagePath = null;
            let categoryImageType = null;
            
            if (category_picture_file) {
                /** If the category_picture_file is provided, process it */
                const fileExtension = path.extname(category_picture_file); /** e.g. '.webp', '.jpg' */
                categoryImageName = category_picture_file;  /** File name from request */
                categoryImagePath = `/media/category/`;
                categoryImageType = fileExtension.slice(1);  /** Remove the dot (e.g. 'webp', 'jpg') */
            }


            if (categoryImageName) {
                const mediaQuery = `INSERT INTO roh_media_gallery (file_name, file_path, file_type, active) VALUES (?, ?, ?, ?)`;
                const mediaValues = [categoryImageName, categoryImagePath, categoryImageType, 1];
              
                pool.execute(mediaQuery, mediaValues, (err, mediaResult) => {
                    mediaId = mediaResult.insertId;
                  if (err) {
                    return GLOBAL_ERROR_RESPONSE("Error saving image to media gallery", err, res);
                  }
                });
              }

            let slug = name
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')  // remove non-word characters
                .replace(/\s+/g, '-')      // replace spaces with hyphens
                .replace(/--+/g, '-');     // remove double hyphens
    
            /** 🔍 Step 1: Check for slug in active categories */
            const [existingActive] = await pool.query(
                `SELECT id FROM roh_categories WHERE slug = ? AND active = 1`,
                [slug]
            );
    
            if (existingActive.length > 0) {
                return GLOBAL_ERROR_RESPONSE("Category with same name already exists.", {}, res);
            }
    
            /** 🔍 Step 2: Check if slug exists in soft-deleted (inactive) category */
            const [existingInactive] = await pool.query(
                `SELECT id FROM roh_categories WHERE slug = ? AND active = 0`,
                [slug]
            );
    
            if (existingInactive.length > 0) {
                // ✅ Reactivate the soft-deleted category
                const categoryId = existingInactive[0].id;
    
                const [update] = await pool.query(
                    `UPDATE roh_categories SET name = ?, description = ?, active = 1, edit_id = ?, parent_category_id = ? WHERE id = ?`,
                    [name, description, edit_id, parent_category_id, categoryId]
                );
    
                if (update.affectedRows === 1) {
                    return GLOBAL_SUCCESS_RESPONSE("Category reactivated successfully.", {}, res);
                } else {
                    return GLOBAL_ERROR_RESPONSE("Failed to reactivate category.", {}, res);
                }
            }
    
            /** ✅ Step 3: Insert new category since slug does not exist anywhere */
            const insertSql = `
                INSERT INTO roh_categories 
                (name, description, active, add_id, edit_id, parent_category_id, slug) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
    
            const [insertResult] = await pool.query(insertSql, [
                name,
                description,
                active,
                add_id,
                edit_id,
                parent_category_id,
                slug
            ]);
    
            if (insertResult.affectedRows === 1) {
                return GLOBAL_SUCCESS_RESPONSE("Category successfully created.", {}, res);
            } else {
                return GLOBAL_ERROR_RESPONSE("Failed to insert category.", {}, res);
            }
    
        } catch (err) {

            let message = "Internal server error";
    
            if (err.code === 'ER_DUP_ENTRY') {
                message = "Duplicate Category Slug.";
            }
    
            return GLOBAL_ERROR_RESPONSE(message, err, res);
        }
    };

    /** Category list Coded by Raj July 04 2025 */
    this.categoryList = async (req, res) => {
        try{
            /** Get page and limit from query parameters (defaults if not provided) */
            const page = parseInt(req.body.page) || 1; /** page 1 if not provided */
            const limit = parseInt(req.body.limit) || 5; /**  5 items per page */

            /** Calculate the offset for pagination */
            const offset = (page - 1) * limit;
            
            // Capture filter parameters
            const categoryName = req.body.category_name || '';

            var sql = "SELECT c.id, c.name, c.description, c.slug, c.parent_category_id, c.active, p.name AS parent_category_name, p.active AS parent_category_status  FROM roh_categories c LEFT JOIN roh_categories p ON c.parent_category_id = p.id WHERE c.active = 1";

            let queryParams = [];

            if (categoryName) { 
                sql += ` AND c.name LIKE ?`;
                queryParams.push(`%${categoryName}%`);
            }

            // const [categoryList] = await pool.query(sql);
            const [categoryList] = await pool.query(sql, queryParams);

            // Total count of filtered categories
            const total = categoryList.length;
            const totalPages = Math.ceil(total / limit);

            // If no categories at all
            if (total == 0 || page > totalPages) {
                return GLOBAL_SUCCESS_RESPONSE("No categories found.", {
                    categoryList: [],
                    page,
                    limit,
                    total,
                    totalPages
                }, res);
            }
    
            // Now paginate the filtered results
            const paginatedCategories = categoryList.slice(offset, offset + limit);
    
            return GLOBAL_SUCCESS_RESPONSE("Categories fetched successfully", {
                category: paginatedCategories,
                page,
                limit,
                total,
                totalPages,
            }, res);
        } catch(error){
            let message = "Internal server error";
            return GLOBAL_ERROR_RESPONSE(message, error, res);
        }
    }

    /** Details Category Coded by Raj July 04 2025 */
    this.categoryDetail = async (req, res) => {
        try {
            const { id } = req.body;
            const sql = ` SELECT c.*, p.name AS parent_category_name FROM roh_categories c
            LEFT JOIN roh_categories p ON c.parent_category_id = p.id
            WHERE c.id = ?`;

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


    /** Update category Coded by Raj July 04-06 2025 */
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
    
            const sql = `UPDATE roh_categories SET name = ?, description = ?, parent_category_id = ?, edit_id = ?, edit_date = NOW()  WHERE id = ?`;
        
            /** Await the result of the query */
            const [result] = await pool.query(sql, [name, description, parent_category_id, edit_id, id]);
    
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

    /** Delete category Coded by Raj July 05 2025 */
    this.deleteCategory = async (req, res) => {
        try {
            const { id } = req.body;
    
            /** SQL query to update the category (set active = 0 to mark it as deleted) */
            const query = `UPDATE roh_categories SET active = 0, edit_date = NOW()  WHERE id = ?`;
    
            /** Await the result of the query */
            const [result] = await pool.query(query, [id]);
    
            /** If no rows were affected, it means the category ID does not exist */
            if (result.affectedRows === 0) {
                return GLOBAL_ERROR_RESPONSE("No category found with the given ID", {}, res);
            }
    
            /** If the category was successfully updated, return a success response */
            return GLOBAL_SUCCESS_RESPONSE("Category deleted successfully", result, res);
    
        } catch (err) {
            console.error("Error in Delete Category:", err);  /** Log the error for debugging */
            return GLOBAL_ERROR_RESPONSE("Internal server error", err, res);
        }
    };

    /** Getting the parent categories list for dropdown Coded by Raj July 27 2025 */
    this.parentCategoryDropdown = async (req, res) => {
        try {    
            const sql = `SELECT id, name FROM roh_categories WHERE active = 1 AND parent_category_id IS NULL ORDER BY name ASC`;
            const [categoryList] = await pool.query(sql);
    
            return GLOBAL_SUCCESS_RESPONSE("Categories fetched successfully", {
                categories: categoryList
            }, res);
    
        } catch (err) {
            console.error("Error fetching parent categories:", err);
            return GLOBAL_ERROR_RESPONSE("Internal server error", err, res);
        }
    };

    /** Geting the all active categories Coded by Vishnu Oct 11 2025 */
    this.admingetAllActiveCate = async (req, res) => {
        try {
            const sql = `SELECT id, name FROM roh_categories WHERE active = 1`;
            const [categoryList] = await pool.query(sql);
    
            return GLOBAL_SUCCESS_RESPONSE("Categories fetched successfully", {
                categories: categoryList
            }, res);
    
        } catch (err) {
            console.error("Error fetching categories:", err);
            return GLOBAL_ERROR_RESPONSE("Internal server error", err, res);
        }
    };
    
}
module.exports = new CategoryApi();
