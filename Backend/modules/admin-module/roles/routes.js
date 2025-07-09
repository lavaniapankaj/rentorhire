const authMiddleware = require('../../../middleware/authMiddleware');
const {validateAddRole, validateGetRole, validateUpdateRole, validateDeleteRole} = require("./validation");
const RoleController = require("./controller");


/**Api for Add Role Coded by Raj July 06 2025 */
app.post(
    ADMIN_NAME + "/role/add",
    //checkLoginAuth,
    authMiddleware,
    validateAddRole, /** Validation middleware */
    (req, res, next) => {
        RoleController.addRole(req, res, next);  /** Call the controller */
    }
);

/** Api for get all Roles Coded by Raj July 06 2025 */
app.post(
    ADMIN_NAME + "/role/list",
    //checkLoginAuth,
    authMiddleware,
    validateGetRole, /** Validation middleware */
    (req, res, next) => {
        RoleController.getAllRoles(req, res, next); /** Call the controller */
    }
);

/** Api for edit role Coded by Raj July 06 2025 */
app.post(
    ADMIN_NAME + "/role/update",
    //checkLoginAuth,
    authMiddleware,
    validateUpdateRole, /** Validation middleware */
    (req, res, next) => {
        RoleController.updateRole(req, res, next);/** Call the controller */
    }
);

/** Api for delete role Coded by Raj July 06 2025 */
app.post(
    ADMIN_NAME + "/role/delete",
    //checkLoginAuth,
    authMiddleware,
    validateDeleteRole, /** Validation middleware */
    (req, res, next) => {
        RoleController.deleteRole(req, res, next);/** Call the controller */
    }
);