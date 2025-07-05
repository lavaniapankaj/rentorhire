function AddnewCityApi() {
    /**
     * Function for add Leads in Leads collection
     *
     * @param req As Request Data
     * @param res As Response Data
     *
     */
    this.AddnewCity = async (req, res) => {
      /** save the data */
      try {
          console.log("Test controller called.");
          return GLOBAL_SUCCESS_RESPONSE(
              "City controller successfully called.",
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
  module.exports = new AddnewCityApi();