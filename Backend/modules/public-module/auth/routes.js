const AuthController = require("./controller");
const {validateUserSignUp, validateServiceProviderRegister, validateUserLogin, validateAdminUserLogin,validateAvailabilityCheck, signUpvalidateOTP, validateResendOTP, signInverifyOtp, ValidateGetAllActivevehiclesCars, ValidateGetAllActivevehiclesBikes,  ValidateGetAllRecentActiveProducts, ValidateViewSingleProduct, ValidateGetSingleCategoryRecentPosts, ValidateGetSingleCategoryRecentFaqs, ValidateGetServiceProviderinfo} = require("./validation");


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
    "/api/user/sign-up-verifyotp",
    signUpvalidateOTP,
    (req, res, next) => {
        AuthController.signUpverifyOTP(req, res, next); /** Calling the controller */
    }
);

/** Resend OTP Coded by Vishnu Aug 12 2025 */
app.post(
    "/api/user/verify-resendotp",
    validateResendOTP,
    (req, res, next) => {
        AuthController.resendOTP(req, res, next); /** Calling the controller */
    }
);

/** signInverifyOtp user login - Coded by Vishnu Aug 13 2025 */
app.post(
    "/api/user/sign-in-verify-otp",
    signInverifyOtp,
    (req, res, next) => {
        AuthController.signInverifyOtp(req, res, next); /** Calling the controller */
    }
);


/** Get all recent 8 active products on home page - Coded by Vishnu Aug 29 2025 */
app.get(
    "/api/user/getrecentproducts",
    ValidateGetAllRecentActiveProducts,
    (req, res, next) => {
        AuthController.getRecentActiveProducts(req, res, next); /** Calling the controller */
    }
);

/** Get all active vehicles cars vehicles--cars page - Coded by Vishnu Aug 29 2025 */
app.get(
    "/api/user/getallvehiclescars",
    ValidateGetAllActivevehiclesCars,
    (req, res, next) => {
        AuthController.getActivevehiclesCars(req, res, next); /** Calling the controller */
    }
);

/** Get all active vehicles bikes vehicles--bikes page - Coded by Vishnu Oct 01 2025 */
app.get(
    "/api/user/getallvehiclesbikes",
    ValidateGetAllActivevehiclesBikes,
    (req, res, next) => {
        AuthController.getActivevehiclesBikes(req, res, next); /** Calling the controller */
    }
);

/** View single item Coded by Vishnu Aug 30 2025 */
app.post(
    "/api/user/viewsingleitem",
    ValidateViewSingleProduct,
    (req, res, next) => {
        AuthController.getsingleListedItemsVie(req, res, next); /** Calling the controller */
    }
);

/** API to get single catregory recent 4 posts/blos - Coded by Vishnu Oct 13 2025 */
app.post(
    "/api/user/getsinglecategoryrecentposts",
    ValidateGetSingleCategoryRecentPosts,
    (req, res, next) => {
        AuthController.getSingleCategoryRecentPosts(req, res, next); /** Calling the controller */
    }
);


/** API to get singe catregory recent 3 FAQs - Coded by Vishnu Oct 14 2025 */
app.post(
    "/api/user/getsinglecategoryrecentfaqs",
    ValidateGetSingleCategoryRecentFaqs,
    (req, res, next) => {
        AuthController.getSingleCategoryRecentFaqs(req, res, next); /** Calling the controller */
    }
);

/** Api to get service provider details - Coded by Vishnu August 31 2025 */
app.post(
    "/api/user/getserviceprovideinfo",
    ValidateGetServiceProviderinfo,
    (req, res, next) => {
        AuthController.getServiceProviderDetails(req, res, next); /** Calling the controller */
    }
);