    const Category = require("./controller");
    const { validateCreateCategory, validateDetailCategory, validateUpdateCategory, validateDeleteCategory } = require('./validation');

    /** API to create a category and sub category Coded by Raj July 04 2025 */
    app.get(
        ADMIN_NAME + "/category/create",
        validateCreateCategory,
        (req, res, next) => {
            Category.createCategory(req, res, next);
        }
    );
    
    /** API to get the category list Coded by Raj July 04 2025 */
    app.get(
        ADMIN_NAME + "/category/list",
        (req, res, next) => {
            Category.categoryList(req, res, next);
        }
    );

    /** API to get the category details by category id Coded by Raj July 04 2025*/
    app.post(
        ADMIN_NAME + "/category/details",
        validateDetailCategory,
        (req, res, next) => {
            Category.categoryDetail(req, res, next);
        }
    )

    /** API to update the category data Coded by Raj July 04 2025 */
    app.post(
        ADMIN_NAME + "/category/update",
        validateUpdateCategory,
        (req, res, next) => {
            Category.updateCategory(req, res, next);
        }
    )

    /** API to delete the category data(soft delete) Coded by Raj July 05 2025 */
    app.get(
        ADMIN_NAME + "/category/delete",
        validateDeleteCategory,
        (req, res, next) => {
            Category.deleteCategory(req, res, next);
        }
    )