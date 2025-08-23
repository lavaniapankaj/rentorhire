const UserModuleController = require("./controller");
const {ValidategetUserDtls, ValidateEditUserDtls} = require("./validation");


/** Api to get user details - Coded by Vishnu August 14 2025 */
app.post(
    "/api/user/userdetails",
    ValidategetUserDtls,
    (req, res, next) => {
        UserModuleController.getUserDetails(req, res, next);
    }
);

/** API to edit user details - Coded by Vishnu August 15 2025 */
app.post(
    "/api/user/edituserdetails",
    ValidateEditUserDtls,
    (req, res, next) => {
        UserModuleController.editUserDetails(req, res, next);
    }
);