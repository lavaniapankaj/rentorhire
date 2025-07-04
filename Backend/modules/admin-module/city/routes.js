const CityController = require("./controller");

/**Api for Add city */
app.get(
    ADMIN_NAME + "/city/add",
    //checkLoginAuth,
    (req, res, next) => {
        CityController.AddnewCity(req, res, next);
    }
);