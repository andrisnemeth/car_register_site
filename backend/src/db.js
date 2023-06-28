const path = require("path");
const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");

dotenv.config();
console.log(process.env.MYSQL_URL)

const sequelize = new Sequelize(process.env.MYSQL_URL, {
  // logging: (sql) => logger.debug(sql),
  models: [path.join(__dirname, "models")],

});
// Define models
const models = [
  require(path.join(__dirname, "models", "User")),
  require(path.join(__dirname, "models", "CarBrand")),
  require(path.join(__dirname, "models", "CarType")),
  require(path.join(__dirname, "models", "FavoriteCar")),
  require(path.join(__dirname, "models", "CarPicture")),
  // Add more model files here if needed
];

// Load models dynamically
models.forEach((model) => {
  const modelDefinition = model(sequelize, Sequelize.DataTypes);
  sequelize.models[modelDefinition.name] = modelDefinition;
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = sequelize;
