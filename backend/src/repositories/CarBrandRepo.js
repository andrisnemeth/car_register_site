const CarBrand = require("../models/CarBrand");
const CarType = require("../models/CarType");
const dotenv = require('dotenv');
const sequelize = require("../db");
dotenv.config()

async function getCarBrandWithCarTypes(brandId) {
  try {
    const carBrand = await CarBrand.findOne({
      where: { brand_name_id: 1, brand_name: "Samara" },
      include: CarType
    });

    return carBrand;
  } catch (error) {

    console.error("Error retrieving car brand:", error);
  }
}

module.exports = {
  getCarBrandWithCarTypes,
};
