const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const CarPicture = sequelize.define("CarPicture", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  favoriteCarId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pictureContent: {
    type: DataTypes.STRING.BINARY,
    allowNull: true,
  },
});

CarPicture.associate = (models) => {
  CarPicture.belongsTo(models.FavoriteCar, { foreignKey: "favoriteCarId" });
};

module.exports = CarPicture;
