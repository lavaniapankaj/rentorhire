    const Category = require("./controller");
    const { validateCreateCategory, validateDetailCategory, validateUpdateCategory } = require('./validation');

    /** API to create a category and sub category */
    app.get(
        ADMIN_NAME + "/category/create",
        validateCreateCategory,
        (req, res, next) => {
            Category.createCategory(req, res, next);
        }
    );
    
    /** API to get the category list */
    app.get(
        ADMIN_NAME + "/category/list",
        (req, res, next) => {
            Category.categoryList(req, res, next);  // Pass req and res so controller can send response
        }
    );

    /** API to get the category details by category id */
    app.post(
        ADMIN_NAME + "/category/details",
        validateDetailCategory,
        (req, res, next) => {
            Category.categoryDetail(req, res, next);
        }
    )

    /** API to update the category data */
    app.post(
        ADMIN_NAME + "/category/update",
        validateUpdateCategory,
        (req, res, next) => {
            Category.updateCategory(req, res, next);
        }
    )