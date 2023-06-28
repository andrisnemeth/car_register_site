const { DataTypes } = require("sequelize");
const CarBrand = require("./CarBrand");

module.exports = (sequelize) => {
  const CarType = sequelize.define("CarType", {
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

  CarType.associate = (models) => {
    CarType.belongsTo(models.CarBrand, { foreignKey: "brand_name_id", as: "CarBrand" });
  };

  return CarType;
};
