module.exports = {
  configure: (router) => {
    app = router;

    /**Admin  modules routes */
    require(WEBSITE_ADMIN_FULL_PATH + "category/routes");
    // require(WEBSITE_ADMIN_FULL_PATH + "country/routes");
    require(WEBSITE_ADMIN_FULL_PATH + "state/routes");
    require(WEBSITE_ADMIN_FULL_PATH + "city/routes");
    require(WEBSITE_ADMIN_FULL_PATH + "roles/routes");
  },
};