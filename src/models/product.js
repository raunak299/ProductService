"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      image: DataTypes.STRING,
      category: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["men", "women", "kids"],
      },
      size: { type: DataTypes.ENUM, values: ["s", "m", "l", "xl", "xxl"] },
      price: { type: DataTypes.INTEGER, allowNull: false },
      rating: { type: DataTypes.INTEGER, defaultValue: 0 },
      title: { type: DataTypes.STRING, allowNull: false },
      in_stock: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
