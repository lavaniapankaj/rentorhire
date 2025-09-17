const UserHostModuleController = require("./controller");
const {ValidategetUserActivecategory, ValidategetUserActivechildcategory, ValidategetUserActivechildcategorybrands, ValidategetUserActivechildcategorybrandsmodel, ValidateHostAddNewVehicle, ValidateLoginServiceProviderItems, ValidateLoginServiceProviderSingleItems, ValidateDeleteServiceProviderSingleItems} = require("./validation");

const multer = require('multer');
const path = require('path');
const fs = require('fs');

/** Set storage engine for multer */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // const uploadPath = path.join(__dirname, '../../../../frontend/public/media/host/items/');
    const uploadPath = path.join(__dirname, '../../../assets/uploads/media/host/items/');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname;
    const fileExtension = path.extname(originalName);
    const fileNameWithoutExt = path.basename(originalName, fileExtension);

    // const uploadPath = path.join(__dirname, '../../../../frontend/public/media/host/items/');
    const uploadPath = path.join(__dirname, '../../../assets/uploads/media/host/items/');
    let newFileName = originalName;
    let counter = 1;

    while (fs.existsSync(path.join(uploadPath, newFileName))) {
      newFileName = `${fileNameWithoutExt}-${counter}${fileExtension}`;
      counter++;
    }
    cb(null, newFileName);
  }
});

/** Initialize multer */
const upload = multer({ storage });


/** Api main for become a host for add new vehicle - Coded by Vishnu August 22 2025 */
app.post(
  "/api/user/becomehostaddnewvehicle",
  upload.array('image_ids', 20),
  (req, res, next) => {
    console.log("FILES>>", (req.files || []).map(f => ({
      field: f.fieldname, name: f.originalname, saved: f.filename, type: f.mimetype
    })));
    // console.log("BODY KEYS>>", Object.keys(req.body || {}));
    next();
  },
  ValidateHostAddNewVehicle,
  (req, res, next) => UserHostModuleController.addNewVehicle(req, res, next)
);





/** Api to get all active parent category - Coded by Vishnu August 19 2025 */
app.get(
    "/api/user/getallactivecategory",
    ValidategetUserActivecategory,
    (req, res, next) => {
        UserHostModuleController.getAllActiveCategory(req, res, next);
    }
);

/** Api to get all active child category - Coded by Vishnu August 20 2025 */
app.post(
    "/api/user/getallactivechildcategory",
    ValidategetUserActivechildcategory,
    (req, res, next) => {
        UserHostModuleController.getAllActiveChildCategory(req, res, next);
    }
);

/** Api to get all child category brands - Coded by Vishnu August 20 2025 */
app.post(
    "/api/user/getallchildcategorybrands",
    ValidategetUserActivechildcategorybrands,
    (req, res, next) => {
        UserHostModuleController.getAllChildCategoryBrands(req, res, next);
    }
);

/** Api to get all child category brands models - Coded by Vishnu August 21 2025 */
app.post(
    "/api/user/getallchildcategorybrandsmodel",
    ValidategetUserActivechildcategorybrandsmodel,
    (req, res, next) => {
        UserHostModuleController.getAllChildCategoryBrandsModel(req, res, next);
    }
);

/** Api to get all service providers listed items - Coded by Vishnu August 23 2025 */
app.post(
    "/api/user/getalllisteditems",
    ValidateLoginServiceProviderItems,
    (req, res, next) => {
        UserHostModuleController.getServiceProviderListedItems(req, res, next);
    }
);

/** API to view service provider single items - Coded by Vishnu August 25 2025 */
app.post(
    "/api/user/getallsinglelisteditems",
    ValidateLoginServiceProviderSingleItems,
    (req, res, next) => {
        UserHostModuleController.getServiceProviderSingleListedItems(req, res, next);
    }
);


/** API to delete service provider single items - Coded by Vishnu September 06 2025 */
app.post(
    "/api/user/deletesinglelisteditems",
    ValidateDeleteServiceProviderSingleItems,
    (req, res, next) => {
        UserHostModuleController.deleteServiceProviderSingleListedItems(req, res, next);
    }
);