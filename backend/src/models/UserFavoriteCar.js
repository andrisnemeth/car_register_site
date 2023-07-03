const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./models/User");
const FavoriteCar = require("./models/FavoriteCar");

const UserFavoriteCar = sequelize.define("UserFavoriteCar", {});

User.belongsToMany(FavoriteCar, {
  through: UserFavoriteCar,
  as: "favoriteCars",
});
FavoriteCar.belongsToMany(User, { through: UserFavoriteCar, as: "users" });

module.exports = UserFavoriteCar;
