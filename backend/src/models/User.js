const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const UserReq = require("./UserReq");
const FavoriteCar = require("./FavoriteCar");

const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  typeOfUser: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

User.associate = (models) => {
  User.hasMany(models.UserReq, { foreignKey: "userId", as: "userReqs" });
  User.hasMany(models.FavoriteCar, { foreignKey: "userId", as: "favoriteCars" });
};

module.exports = User;
