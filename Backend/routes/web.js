module.exports = {
    configure: (router) => {
      app = router;
  
      /** Admin modules routes */
      require(WEBSITE_ADMIN_FULL_PATH + "category/routes");
      require(WEBSITE_ADMIN_FULL_PATH + "state/routes");
      require(WEBSITE_ADMIN_FULL_PATH + "city/routes");
      require(WEBSITE_ADMIN_FULL_PATH + "roles/routes");
      require(WEBSITE_ADMIN_FULL_PATH + "user/routes");
      require(WEBSITE_ADMIN_FULL_PATH + "route/routes");
      require(WEBSITE_ADMIN_FULL_PATH + "post/routes");
      require(WEBSITE_ADMIN_FULL_PATH + "faq/routes");

      /** Public module routes */
      require(WEBSITE_PUBLIC_FULL_PATH + "auth/routes");
      require(WEBSITE_PUBLIC_USER_FULL_PATH + "/routes");
      require(WEBSITE_PUBLIC_USER_HOST_FULL_PATH + "/routes");
  
    },
  };
