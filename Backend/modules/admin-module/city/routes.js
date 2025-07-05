const CityController = require("./controller");
const {ValidateaddnewCity, ValidategetallCity, ValidateeditCity, ValidateDeleteCity} = require("./validation");


/**Api for Add cities Coded by Vishnu June 05 2025 */
app.post(
    ADMIN_NAME + "/city/add", 
    //checkLoginAuth,  
    ValidateaddnewCity, /** Validation middleware */
    (req, res, next) => {
        CityController.AddnewCity(req, res, next);  /** Call the controller */
    }
);

/** Api for get all cities Coded by Vishnu June 05 2025 */
app.get(
    ADMIN_NAME + "/city/get", 
    //checkLoginAuth,
    ValidategetallCity, /** Validation middleware */
    (req, res, next) => {
        CityController.GetallCity(req, res, next); /** Call the controller */
    }
);

/** Api for edit cities Coded by Vishnu June 05 2025 */
app.post(
    ADMIN_NAME + "/city/edit", 
    //checkLoginAuth,
    ValidateeditCity, /** Validation middleware */
    (req, res, next) => {
        CityController.EditCity(req, res, next);/** Call the controller */
    }
);

/** Api for delete cities Coded by Vishnu June 05 2025 */
app.post(
    ADMIN_NAME + "/city/delete", 
    //checkLoginAuth,
    ValidateDeleteCity, /** Validation middleware */
    (req, res, next) => {
        CityController.DeleteCity(req, res, next);/** Call the controller */
    }
);