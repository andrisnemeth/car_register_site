const express = require("express");
const cors = require("cors");
const app = express();

//picture uploading imports
const storage = require("./storage");
const multer = require("multer");
const upload = multer({ storage });

const { registrationValidationRules } = require("./expressValidation");
const { addNewCarBrandValidationRules } = require("./expressValidation");

// controller imports
const userController = require("./controllers/userController");
const userReqController = require("./controllers/userReqController");
const carManagementController = require("./controllers/carManagementController");
const { uploadCarPicture } = require("./controllers/carManagementController");

//model imports
require("./models/CarBrand");
require("./models/CarType");
require("./models/CarPicture");
require("./models/FavoriteCar");
require("./models/User");
require("./models/UserReq");
// const { verifyToken } = require("./jsonwebtoken");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

///// GET
app.get("/users", userController.getAllUsers);
app.get("/users/:id", userController.getUserById);
app.get("/user-reqs", userReqController.getAllUserReqs);
app.get("/car-brand", carManagementController.getCarBrand);
app.get("/car-brands", carManagementController.getAllCarBrands);
app.get("/car-types", carManagementController.getAllCarTypes);
app.get("/car-types-selected", carManagementController.getSelectedCarTypes);

///// POST
app.post("/register", registrationValidationRules, userController.registerUser);
app.post("/login", userController.loginUser);
app.post("/logout", userController.postLogout);
app.post("/user-reqs", userReqController.addNewReq);
app.post(
  "/car-brands",
  addNewCarBrandValidationRules,
  carManagementController.addNewCarBrand
);
app.post("/car-types", carManagementController.addNewCarType);
app.post("/car-pictures", upload.single("carPicture"), uploadCarPicture);

///// UPDATE

//// PATCH
app.patch("/users/:id", userController.editTypeOfUserById);

//// DELETE

module.exports = app;
