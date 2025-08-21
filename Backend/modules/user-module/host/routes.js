const UserHostModuleController = require("./controller");
const {ValidategetUserActivecategory, ValidategetUserActivechildcategory, ValidategetUserActivechildcategorybrands, ValidategetUserActivechildcategorybrandsmodel} = require("./validation");

/** Api to get all active parent category - Coded by Vishnu August 19 2025 */
app.get(
    "/user/getallactivecategory",
    ValidategetUserActivecategory,
    (req, res, next) => {
        UserHostModuleController.getAllActiveCategory(req, res, next);
    }
);

/** Api to get all active child category - Coded by Vishnu August 20 2025 */
app.post(
    "/user/getallactivechildcategory",
    ValidategetUserActivechildcategory,
    (req, res, next) => {
        UserHostModuleController.getAllActiveChildCategory(req, res, next);
    }
);

/** Api to get all child category brands - Coded by Vishnu August 20 2025 */
app.post(
    "/user/getallchildcategorybrands",
    ValidategetUserActivechildcategorybrands,
    (req, res, next) => {
        UserHostModuleController.getAllChildCategoryBrands(req, res, next);
    }
);

/** Api to get all child category brands models - Coded by Vishnu August 21 2025 */
app.post(
    "/user/getallchildcategorybrandsmodel",
    ValidategetUserActivechildcategorybrandsmodel,
    (req, res, next) => {
        UserHostModuleController.getAllChildCategoryBrandsModel(req, res, next);
    }
);