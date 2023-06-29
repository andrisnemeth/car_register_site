const { DataTypes } = require("sequelize");
const sequelize = require("../db");

// User model
const User = sequelize.define("User", {
  // Define user model fields
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type_of_user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

// CarBrand model
const CarBrand = sequelize.define("CarBrand", {
  // Define car brand model fields
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  brand_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// CarType model
const CarType = sequelize.define("CarType", {
  // Define car type model fields
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  brand_name_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// CarPicture model
const CarPicture = sequelize.define("CarPicture", {
  // Define car picture model fields
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

// FavoriteCar model
const FavoriteCar = sequelize.define("FavoriteCar", {
  // Define favorite car model fields
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

// Define model associations
CarType.belongsTo(CarBrand, { foreignKey: "brand_name_id" });
CarPicture.belongsTo(FavoriteCar, { foreignKey: "favorite_car_id" });
FavoriteCar.belongsTo(User, { foreignKey: "user_id" });
FavoriteCar.belongsTo(CarType, { foreignKey: "type_name_id" });

// Export models
module.exports = {
  User,
  CarBrand,
  CarType,
  CarPicture,
  FavoriteCar,
};
