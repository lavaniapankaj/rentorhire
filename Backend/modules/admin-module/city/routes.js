const authMiddleware = require('../../../middleware/authMiddleware');
const {ValidateaddnewCity, ValidategetallCity, ValidateeditCity, ValidateDeleteCity, ValidategetsingleCity} = require("./validation");
const CityController = require("./controller");


/**Api for Add cities Coded by Vishnu July 05 2025 */
app.post(
    ADMIN_NAME + "/city/add", 
    //checkLoginAuth,
    authMiddleware,  
    ValidateaddnewCity, /** Validation middleware */
    (req, res, next) => {
        CityController.AddnewCity(req, res, next);  /** Call the controller */
    }
);

/** Api for get all cities Coded by Vishnu July 05 2025 */
app.post(
    ADMIN_NAME + "/city/get", 
    //checkLoginAuth,
    authMiddleware,
    ValidategetallCity, /** Validation middleware */
    (req, res, next) => {
        CityController.GetallCity(req, res, next); /** Call the controller */
    }
);

/** Api for edit cities Coded by Vishnu July 05 2025 */
app.post(
    ADMIN_NAME + "/city/edit", 
    //checkLoginAuth,
    authMiddleware,
    ValidateeditCity, /** Validation middleware */
    (req, res, next) => {
        CityController.EditCity(req, res, next);/** Call the controller */
    }
);

/** Api for delete cities Coded by Vishnu July 05 2025 */
app.post(
    ADMIN_NAME + "/city/delete", 
    //checkLoginAuth,
    authMiddleware,
    ValidateDeleteCity, /** Validation middleware */
    (req, res, next) => {
        CityController.DeleteCity(req, res, next);/** Call the controller */
    }
);

/*** get single city all details Coded by Vishnu July 24 2025 */
app.post(
    ADMIN_NAME + "/city/getsingle", 
    //checkLoginAuth,
    authMiddleware,
    ValidategetsingleCity, /** Validation middleware */
    (req, res, next) => {
        CityController.GetSingleCity(req, res, next);/** Call the controller */
    }
);