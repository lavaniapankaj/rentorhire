/** Create the global variables/constants here in this file */
require("dotenv").config();

ADMIN_NAME = "/admin";

WEBSITE_ROOT_PATH = process.cwd() + "/";
WEBSITE_ADMIN_FULL_PATH = WEBSITE_ROOT_PATH + "modules/admin-module/";

STATUS_ERROR = false;
STATUS_SUCCESS = true;