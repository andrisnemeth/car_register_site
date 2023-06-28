const { DataTypes } = require("sequelize");
const sequelize = require("../db");

module.exports = (sequelize) => {
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

  return CarBrand;
};
