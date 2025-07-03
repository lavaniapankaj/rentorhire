function CategoryApi() {
  /**
   * Function for add Leads in Leads collection
   *
   * @param req As Request Data
   * @param res As Response Data
   *
   */
  this.Categorytest = async (req, res) => {
    /** save the data */
    try {
        console.log("Test controller called.");
        return GLOBAL_SUCCESS_RESPONSE(
            "Category controller successfully called.",
            {},
            res
        );
    } catch (err) {
        var message = "Internal server error";
        if (err.code == 11000) var message = "Duplicate Lead.";

        return GLOBAL_ERROR_RESPONSE(message, err, res);
    }
  };
}
module.exports = new CategoryApi();