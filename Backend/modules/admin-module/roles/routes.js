const RoleController = require("./controller");
const {validateAddRole, validateGetRole, validateUpdateRole, validateDeleteRole} = require("./validation");


/**Api for Add Role Coded by Raj July 06 2025 */
app.post(
    ADMIN_NAME + "/role/add",
    //checkLoginAuth,  
    validateAddRole, /** Validation middleware */
    (req, res, next) => {
        RoleController.addRole(req, res, next);  /** Call the controller */
    }
);

/** Api for get all Roles Coded by Raj July 06 2025 */
app.post(
    ADMIN_NAME + "/role/list",
    //checkLoginAuth,
    validateGetRole, /** Validation middleware */
    (req, res, next) => {
        RoleController.getAllRoles(req, res, next); /** Call the controller */
    }
);

/** Api for edit role Coded by Raj July 06 2025 */
app.post(
    ADMIN_NAME + "/role/update",
    //checkLoginAuth,
    validateUpdateRole, /** Validation middleware */
    (req, res, next) => {
        RoleController.updateRole(req, res, next);/** Call the controller */
    }
);

/** Api for delete role Coded by Raj July 06 2025 */
app.post(
    ADMIN_NAME + "/role/delete",
    //checkLoginAuth,
    validateDeleteRole, /** Validation middleware */
    (req, res, next) => {
        RoleController.deleteRole(req, res, next);/** Call the controller */
    }
);