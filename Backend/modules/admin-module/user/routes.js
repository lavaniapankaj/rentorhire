const UserController = require("./controller");
const {ValidateaddnewUser, ValidateGetAllUsers, ValidateEditUser,ValidateDeleteUser, ValidateViewUser } = require("./validation");


/** Api for adding new user Coded by Vishnu July 06 2025 */
app.post(
    ADMIN_NAME + "/user/create", 
    //checkLoginAuth, // Uncomment if you have authentication middleware
    ValidateaddnewUser, /** Validation middleware */
    (req, res, next) => {
        UserController.AddnewUser(req, res, next); /** Call the controller after validation */
    }
);

/** Get all user Coded by Vishnu July 07 2025 */
app.get(
    ADMIN_NAME + "/user/get", 
    //checkLoginAuth,  Uncomment if you have authentication middleware
    ValidateGetAllUsers, /** Validation middleware */
    (req, res, next) => {
        UserController.GetAllUsers(req, res, next); /** Call the controller */
    }
);

/** Edit user Coded by Vishnu July 07 2025 */
app.post(
    ADMIN_NAME + "/user/edit", 
    //checkLoginAuth,  Uncomment if you have authentication middleware
    ValidateEditUser, /** Validation middleware */
    (req, res, next) => {
        UserController.UpdateUser(req, res, next); /** Call the controller */
    }
);

/** Delete user Coded by Vishnu July 07 2025 */
app.post(
    ADMIN_NAME + "/user/delete", 
    //checkLoginAuth,  Uncomment if you have authentication middleware
    ValidateDeleteUser, /** Validation middleware */
    (req, res, next) => {
        UserController.DeleteUser(req, res, next); /** Call the controller */
    }
);

/** View user details Coded by Vishnu July 07 2025 */
app.get(
    ADMIN_NAME + "/user/view", 
    //checkLoginAuth,  Uncomment if you have authentication middleware
    ValidateViewUser, /** Validation middleware */
    (req, res, next) => {
        UserController.ViewUser(req, res, next); /** Call the controller */
    }
);
