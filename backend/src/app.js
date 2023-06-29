const express = require("express");
const cors = require("cors");
const app = express();
const { registrationValidationRules } = require("./expressValidation");
const userController = require("./controllers/userController");
const CarBrandController = require("./controllers/CarBrandController");
require("./models/CarBrand");
require("./models/CarType");
require("./models/CarPicture");
require("./models/FavoriteCar");
require("./models/User");

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());
// app.use(loggingMiddleware({ logger }));

///// GET
app.get("/car_brand", CarBrandController.getCarBrand);
app.get("/users", userController.getAllUsers);

///// POST
app.post("/register", registrationValidationRules, userController.registerUser);
app.post("/login", userController.loginUser);

module.exports = app;
