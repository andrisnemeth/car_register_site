const CarBrand = require("../models/CarBrand");
const CarType = require("../models/CarType");
const CarPicture = require("../models/CarPicture");
const { validationResult } = require("express-validator");
const multer = require("multer");

//CarBrand
async function getCarBrand(req, res) {
  try {
    const data = await CarBrand.findOne({
      where: { brandNameId: 1 },
      include: {
        model: CarType,
        as: "CarTypes",
      },
    });

    res.send(data);
  } catch (error) {
    res.sendStatus(500);
  }
}

async function getAllCarBrands(req, res) {
  try {
    const data = await CarBrand.findAll();
    res.send(data);
    console.log(data);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function addNewCarBrand(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation errors:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { brandName } = req.body;
    const existingBrandName = await CarBrand.findOne({ where: { brandName } });

    if (existingBrandName) {
      return res.status(400).json({ error: "Az márka már létezik létezik" });
    }

    const newBrand = await CarBrand.create({ brandName });

    await newBrand.save();

    return res
      .status(200)
      .json({ message: "Sikeresen hozzáadta ezt a márkát!" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

//CarType
async function getAllCarTypes(req, res) {
  try {
    const data = await CarType.findAll();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function getSelectedCarTypes(req, res) {
  try {
    const { brandNameId } = req.query;
    const data = await CarType.findAll({ where: { brandNameId } });
    console.log("Generated query:", data);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function addNewCarType(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation errors:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { typeName, brandNameId } = req.body;
    const existingTypeName = await CarType.findOne({ where: { typeName } });

    if (existingTypeName) {
      return res.status(400).json({ error: "Az típus már létezik létezik" });
    }

    const newType = await CarType.create({ typeName, brandNameId });

    await newType.save();

    return res
      .status(200)
      .json({ message: "Sikeresen hozzáadta ezt a típust!" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function uploadCarPicture(req, res) {
  try {
    const { favoriteCarId } = req.body;
    const fileBuffer = req.file.buffer;

    const carPicture = await CarPicture.create({
      favoriteCarId,
      pictureContent: fileBuffer,
    });

    res.status(201).json({ carPicture });
  } catch (error) {
    console.error("Error uploading car picture:", error);
    res.status(500).json({ error: "Failed to upload car picture" });
  }
}


module.exports = {
  getCarBrand,
  getAllCarBrands,
  addNewCarBrand,
  getAllCarTypes,
  getSelectedCarTypes,
  addNewCarType,
  uploadCarPicture,
};
