const path = require("path");
const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");

dotenv.config();

const sequelize = new Sequelize(process.env.MYSQL_URL);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = sequelize;
