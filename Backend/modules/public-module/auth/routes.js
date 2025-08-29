const AuthController = require("./controller");
const {validateUserSignUp, validateServiceProviderRegister, validateUserLogin, validateAdminUserLogin,validateAvailabilityCheck, validateOTP, validateResendOTP, verifyOtp, ValidateGetAllActiveProducts} = require("./validation");


/** Api for register user Coded by Raj July 07 2025 */
app.post(
    // ADMIN_NAME + "/user/signup",
    "/api/user/signup",
    //checkLoginAuth,  
    validateUserSignUp,
    (req, res, next) => {
        AuthController.userRegister(req, res, next);  /** Call the controller */
    }
)

/** Api for register service provider Coded by Raj July 08 2025 */
app.post(
    // ADMIN_NAME + "/user/signup",
    "/api/service-provider/register",
    //checkLoginAuth,  
    validateServiceProviderRegister,
    (req, res, next) => {
        AuthController.serviceProviderRegister(req, res, next);
    }
);

/** Api to login the user - Coded by Raj July 09 2025 */
app.post(
    "/api/user/login",
    validateUserLogin,
    (req, res, next) => {
        AuthController.userLogin(req, res, next); /** Calling the controller */
    }
);

/** Api to login the admin - Coded by Raj July 10 2025 */
app.post(
    "/api/adminrohpnl/login",
    validateAdminUserLogin,
    (req, res, next) => {
        AuthController.adminUserLogin(req, res, next); /** Calling the controller */
    }
);

/** API Check Availability Coded by Vishnu Aug 11 2025 */
app.post(
    "/api/user/checkavailability",
    validateAvailabilityCheck,
    (req, res, next) => {
        AuthController.checkAvailability(req, res, next); /** Calling the controller */
    }
);

/** OTP Verification Coded by Vishnu Aug 12 2025 */
app.post(
    "/api/user/verifyotp",
    validateOTP,
    (req, res, next) => {
        AuthController.verifyOTP(req, res, next); /** Calling the controller */
    }
);

/** Resend OTP Coded by Vishnu Aug 12 2025 */
app.post(
    "/api/user/resendotp",
    validateResendOTP,
    (req, res, next) => {
        AuthController.resendOTP(req, res, next); /** Calling the controller */
    }
);

/** verifyOtp user login - Coded by Vishnu Aug 13 2025 */
app.post(
    "/api/user/verify-otp",
    verifyOtp,
    (req, res, next) => {
        AuthController.verifyOtp(req, res, next); /** Calling the controller */
    }
);

/** Get all active products on product archive page - Coded by Vishnu Aug 29 2025 */
app.get(
    "/api/user/getallproducts",
    ValidateGetAllActiveProducts,
    (req, res, next) => {
        AuthController.getActiveProducts(req, res, next); /** Calling the controller */
    }
);