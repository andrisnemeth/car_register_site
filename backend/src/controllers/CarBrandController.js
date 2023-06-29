const CarBrand = require("../models/CarBrand");
const CarType = require("../models/CarType");

async function getCarBrand(req, res) {
  try {
    const data = await CarBrand.findOne({
      where: { brand_name_id: 1 },
      include: {
        model: CarType,
        as: "CarTypes", // Use the correct association alias here
      },
    });

    res.send(data);
  } catch (error) {
    res.sendStatus(500);
  }
}

module.exports = { getCarBrand };
