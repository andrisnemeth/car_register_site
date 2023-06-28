const express = require("express");
const cors = require("cors");
const app = express();
// const userController = require("./controllers/userController");
const CarBrandController = require("./controllers/CarBrandController");
require('./models/CarBrand')
require('./models/CarType')
require('./models/CarPicture')
require('./models/FavoriteCar')
require('./models/User')

app.use(cors());

// app.use(loggingMiddleware({ logger }));
// app.get("/users", userController.getAllUsers);
app.get("/car_brand", CarBrandController.getCarBrand);

module.exports = app;
