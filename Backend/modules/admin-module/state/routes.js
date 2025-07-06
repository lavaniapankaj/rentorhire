const StateController = require("./controller");
const {ValidateaddnewState, ValidategetallState, ValidateeditState, ValidateDeleteState} = require("./validation");

/** Api for adding new states Coded by Vishnu July 03 2025 */
app.post(
    ADMIN_NAME + "/state/add", 
    //checkLoginAuth, // Uncomment if you have authentication middleware
    ValidateaddnewState, /** Validation middleware */
    (req, res, next) => {
        StateController.AddnewState(req, res, next); /** Call the controller after validation */
    }
);

/** Api for get all states Coded by Vishnu July 04 2025 */
app.get(
    ADMIN_NAME + "/state/get", 
    //checkLoginAuth,
    ValidategetallState, /** Validation middleware */
    (req, res, next) => {
        StateController.GetallState(req, res, next);/** Call the controller after validation */
    }
);

/** Api for edit states Coded by Vishnu July 04 2025 */
app.post(
    ADMIN_NAME + "/state/edit", 
    //checkLoginAuth,
    ValidateeditState, /** Validation middleware */
    (req, res, next) => {
        StateController.EditState(req, res, next);/** Call the controller after validation */
    }
);


/** Api for delete states Coded by Vishnu July 04 2025 */
app.post(
    ADMIN_NAME + "/state/delete", 
    //checkLoginAuth,
    ValidateDeleteState, /** Validation middleware */
    (req, res, next) => {
        StateController.DeleteState(req, res, next);/** Call the controller after validation */
    }
);