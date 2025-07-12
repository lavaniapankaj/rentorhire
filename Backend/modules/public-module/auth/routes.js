const AuthController = require("./controller");
const {validateUserSignUp, validateServiceProviderRegister, validateUserLogin, validateAdminUserLogin} = require("./validation");


/** Api for register user Coded by Raj July 07 2025 */
app.post(
    // ADMIN_NAME + "/user/signup",
    "/user/signup",
    //checkLoginAuth,  
    validateUserSignUp,
    (req, res, next) => {
        AuthController.userRegister(req, res, next);  /** Call the controller */
    }
)

/** Api for register service provider Coded by Raj July 08 2025 */
app.post(
    // ADMIN_NAME + "/user/signup",
    "/service-provider/register",
    //checkLoginAuth,  
    validateServiceProviderRegister,
    (req, res, next) => {
        AuthController.serviceProviderRegister(req, res, next);
    }
);

/** Api to login the user - Coded by Raj July 09 2025 */
app.post(
    "/user/login",
    validateUserLogin,
    (req, res, next) => {
        AuthController.userLogin(req, res, next); /** Calling the controller */
    }
);

/** Api to login the admin - Coded by Raj July 10 2025 */
app.post(
    "/adminrohpnl/login",
    validateAdminUserLogin,
    (req, res, next) => {
        AuthController.adminUserLogin(req, res, next); /** Calling the controller */
    }
);