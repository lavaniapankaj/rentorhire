const authMiddleware = require('../../../middleware/authMiddleware');
const {ValidateaddnewUser, ValidateGetAllUsers, ValidateEditUser,ValidateDeleteUser, ValidateViewUser } = require("./validation");
const UserController = require("./controller");

const multer = require('multer');
const upload = multer(); // memory storage, no actual files saved

/** Api for adding new user Coded by Vishnu July 06 2025 */
app.post(
    ADMIN_NAME + "/user/create",
    authMiddleware,
    upload.none(),               /** First: Parse multipart/form-data (required) */
    ValidateaddnewUser,          /** Second: validate req.body */
    (req, res, next) => {
        UserController.AddnewUser(req, res, next); 
    }
);

/** Get all user Coded by Vishnu July 07 2025 */
app.post(
    ADMIN_NAME + "/user/get",
    authMiddleware,
    ValidateGetAllUsers, /** Validation middleware */
    (req, res, next) => {
        UserController.GetAllUsers(req, res, next); /** Call the controller */
    }
);

/** Edit user Coded by Vishnu July 07 2025 */
app.post(
    ADMIN_NAME + "/user/edit",
    authMiddleware,
    ValidateEditUser, /** Validation middleware */
    (req, res, next) => {
        UserController.UpdateUser(req, res, next); /** Call the controller */
    }
);

/** Delete user Coded by Vishnu July 07 2025 */
app.post(
    ADMIN_NAME + "/user/delete",
    authMiddleware,
    ValidateDeleteUser, /** Validation middleware */
    (req, res, next) => {
        UserController.DeleteUser(req, res, next); /** Call the controller */
    }
);

/** View user details Coded by Vishnu July 07 2025 */
app.post(
    ADMIN_NAME + "/user/view", // Change GET to POST
    authMiddleware, // Use your authentication middleware if needed
    ValidateViewUser,  // Your validation middleware
    (req, res, next) => {
        UserController.ViewUser(req, res, next); // Call the controller
    }
);

