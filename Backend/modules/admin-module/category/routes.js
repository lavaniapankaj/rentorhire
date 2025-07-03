    const Category = require("./controller");

    /**Api for getting list of leads*/
    app.get(
        ADMIN_NAME + "/category/test",
        //checkLoginAuth,
        (req, res, next) => {
            Category.Categorytest(req, res, next);
        }
    );