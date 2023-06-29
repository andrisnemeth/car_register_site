const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const CarBrand = sequelize.define("CarBrand", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  brand_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = CarBrand;
