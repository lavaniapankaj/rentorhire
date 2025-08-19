const UserModuleController = require("./controller");
const {ValidategetUserActivecategory} = require("./validation");

/** Api to get all active category - Coded by Vishnu August 19 2025 */
app.get(
    "/user/getallactivecategory",
    ValidategetUserActivecategory,
    (req, res, next) => {
        UserModuleController.getAllActiveCategory(req, res, next);
    }
);