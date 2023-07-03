const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const CarBrand = require("./CarBrand");

const CarType = sequelize.define("CarType", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  brandNameId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  typeName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

CarType.associate = (models) => {
  CarType.belongsTo(models.CarBrand, {
    foreignKey: "brandNameId",
    as: "CarBrand",
  });
  CarType.hasMany(models.FavoriteCar, {
    foreignKey: "typeNameId",
    as: "CarType",
  });
};

module.exports = CarType;
