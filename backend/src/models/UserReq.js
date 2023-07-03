const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./User");

const UserReq = sequelize.define("UserReq", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reqContent: {
    type: DataTypes.STRING(1234),
    allowNull: false,
  },
  datePosted: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

UserReq.associate = (models) => {
  UserReq.belongsTo(models.User, { foreignKey: "userId", as: "user" });
};

module.exports = UserReq;
