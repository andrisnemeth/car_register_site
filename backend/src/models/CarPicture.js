const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const CarPicture = sequelize.define("CarPicture", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    favorite_car_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    picture_content: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
  });

  CarPicture.associate = (models) => {
    CarPicture.belongsTo(models.FavoriteCar, { foreignKey: "favorite_car_id" });
  };

  return CarPicture;
};
