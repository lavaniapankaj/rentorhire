// 🟩 Create Category Validation
const validateCreateCategory = (req, res, next) => {
    console.log("validation check here, create category");

    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({
            success: false,
            message: "The 'name' field is required and must be a non-empty string."
        });
    }

    next();
};

// 🟨 Update Category Validation
const validateDetailCategory = (req, res, next) => {
    console.log("validation here.");
    const { id } = req.body;

    if (!id || isNaN(Number(id))) {
        return res.status(400).json({
            success: false,
            message: "A valid 'id' is required to get the details."
        });
    }

    next();
};

// Delete Category Validation
const validateDeleteCategory = (req, res, next) => {
    const { id } = req.body;

    if (!id || isNaN(Number(id))) {
        return res.status(400).json({
            success: false,
            message: "A valid 'id' is required to delete a category."
        });
    }

    next();
};

const validateUpdateCategory = (req,res, next) => {
    const { id } = req.body;

    if (!id || isNaN(Number(id))) {
        return res.status(400).json({
            success: false,
            message: "A valid 'id' is required to update a category."
        });
    }

    next();
};

// Export all validation functions
module.exports = {
    validateCreateCategory,
    validateDetailCategory,
    validateDeleteCategory,
    validateUpdateCategory
};
