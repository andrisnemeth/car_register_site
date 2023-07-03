const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const CarType = require('./CarType');

const CarBrand = sequelize.define("CarBrand", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  brandName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

CarBrand.associate = (models) => {
  CarBrand.hasMany(models.CarType, { foreignKey: 'brandNameId', as: 'types' });
};

module.exports = CarBrand;
