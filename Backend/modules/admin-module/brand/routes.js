    const Category = require("./controller");
    const authMiddleware = require('../../../middleware/authMiddleware');
    const {validateGetBrand, validateCreateBrand, validateDetailBrand, validateUpdateBrand, validateDeleteBrand } = require('./validation');

    const multer = require('multer');
    const path = require('path');
    const fs = require('fs');

    // added to check 
    /** Set storage engine for multer */
    const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set the path to the frontend directory
        const uploadPath = path.join(__dirname, '../../../../frontend/public/media/category/');
        
        // Ensure the folder exists
        if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
        }
        
        cb(null, uploadPath); // Save to this path
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname; // Original filename (e.g., pankaj-img-1.webp)
        const fileExtension = path.extname(originalName); // Extract the file extension (.webp)
        const fileNameWithoutExt = path.basename(originalName, fileExtension); // Extract filename without extension (e.g., pankaj-img-1)

        let newFileName = originalName; // Default to the original name
        let counter = 1;

        // Check if the file already exists in the folder
        while (fs.existsSync(path.join(__dirname, '../../../../frontend/public/media/category', newFileName))) {
        // If it exists, append the counter (e.g., pankaj-img-1-1.webp, pankaj-img-1-2.webp)
        newFileName = `${fileNameWithoutExt}-${counter}${fileExtension}`;
        counter++;
        }

        // Save the file with the unique name
        cb(null, newFileName);
    }
    });

    /** Initialize multer with storage configuration */
    const upload = multer({ storage: storage });


    /** API to create a category and sub category Coded by Raj July 04 2025 */
    app.post(
        ADMIN_NAME + "/brand/create",
        authMiddleware,
        upload.single('category_picture_file'),
        validateCreateBrand,
        (req, res, next) => {
            if (req.file) {
                req.body.category_picture_file = req.file.filename; /** Set file name to request body */
              } else {
                //return res.status(400).json({ message: "No file uploaded" });
              }
            Category.createCategory(req, res, next);
        }
    );
    
    /** API to get the category list Coded by Raj July 04 2025 */
    app.post(
        ADMIN_NAME + "/brand/list",
        authMiddleware,
        validateGetBrand,
        (req, res, next) => {
            Category.categoryList(req, res, next);
        }
    );

    /** API to get the parent category list for dropdowns Coded by Raj July 27 2025 */
    app.get(
        ADMIN_NAME + "/brand/getParent",
        authMiddleware,
        // validateGetBrand,
        (req, res, next) => {
            Category.parentCategoryDropdown(req, res, next);
        }
    );

    /** API to get the category details by category id Coded by Raj July 04 2025*/
    app.post(
        ADMIN_NAME + "/brand/details",
        authMiddleware,
        validateDetailBrand,
        (req, res, next) => {
            Category.categoryDetail(req, res, next);
        }
    )

    /** API to update the category data Coded by Raj July 04 2025 */
    app.post(
        ADMIN_NAME + "/brand/update",
        authMiddleware,
        validateUpdateBrand,
        (req, res, next) => {
            Category.updateCategory(req, res, next);
        }
    )

    /** API to delete the category data(soft delete) Coded by Raj July 05 2025 */
    app.post(
        ADMIN_NAME + "/brand/delete",
        authMiddleware,
        validateDeleteBrand,
        (req, res, next) => {
            Category.deleteCategory(req, res, next);
        }
    )