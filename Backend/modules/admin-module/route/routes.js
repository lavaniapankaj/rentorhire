const RouteController = require("./controller");

/** Api for adding new route Coded by Vishnu July 07 2025 */
app.post(
    ADMIN_NAME + "/route/create", 
    //checkLoginAuth, // Uncomment if you have authentication middleware
    (req, res, next) => {
        RouteController.AddNewAdminRoute(req, res, next); /** Call the controller after validation */
    }
);
