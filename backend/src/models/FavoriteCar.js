const { DataTypes } = require("sequelize");
const sequelize = require("../db");

module.exports = (sequelize, DataTypes) => {
  const FavoriteCar = sequelize.define("FavoriteCar", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type_name_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fuel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  FavoriteCar.associate = (models) => {
    FavoriteCar.belongsTo(models.CarType, { foreignKey: "type_name_id" });
    FavoriteCar.belongsTo(models.User, { foreignKey: "user_id" });
  };

  return FavoriteCar;
};
