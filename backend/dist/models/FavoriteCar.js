const {
  DataTypes
} = require("sequelize");
const sequelize = require("../db");
const FavoriteCar = sequelize.define("FavoriteCar", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  typeNameId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fuel: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
FavoriteCar.associate = models => {
  FavoriteCar.belongsTo(models.CarType, {
    foreignKey: "typeNameId"
  });
  FavoriteCar.belongsTo(models.User, {
    foreignKey: "userId"
  });
};
module.exports = FavoriteCar;