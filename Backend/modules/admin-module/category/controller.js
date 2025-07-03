// controller.js
const pool = require('../../../config/connection');  // Correct import of the promisePool

function CategoryApi() {

  this.Categorytest = async (req, res) => {
      try {
          console.log("Test controller called.");

          // Static test data (replace this with actual dynamic data later)
          const name = "Electronics";
          const description = "Category for all electronic products";
          const active = 1;  // 1 means active, 0 would mean inactive
          const add_id = 1;  // User ID who is adding this category (example: 1)
          const edit_id = 1; // User ID who last edited (example: 1)
          const parent_category_id = null;  // Example: null for top-level category
          const slug = "electronics";  // URL-friendly slug for the category

          // SQL query to insert data into the categories table
          const sql = `
              INSERT INTO roh_categories (name, description, active, add_id, edit_id, parent_category_id, slug)
              VALUES (?, ?, ?, ?, ?, ?, ?)
          `;

          // Execute the query using the pool
          const [result] = await pool.query(sql, [
              name, 
              description, 
              active,
              add_id,
              edit_id,
              parent_category_id,
              slug
          ]);

          console.log("result>>> ", result);

          // Check if insertion was successful (affectedRows should be 1 if inserted successfully)
          if (result.affectedRows === 1) {
              return GLOBAL_SUCCESS_RESPONSE(
                  "Category successfully created.",
                  { id: result.insertId, name, description, active, add_id, edit_id, parent_category_id, slug },
                  res
              );
          } else {
              return GLOBAL_ERROR_RESPONSE("Failed to insert category.", {}, res);
          }

      } catch (err) {

        console.log("err>> ", err);

          let message = "Internal server error";
          // Handle MySQL errors like duplicate entries for slug
          if (err.code === 'ER_DUP_ENTRY') {
              message = "Duplicate Category Slug.";
          }

          return GLOBAL_ERROR_RESPONSE(message, err, res);
      }
  };
}

module.exports = new CategoryApi();
