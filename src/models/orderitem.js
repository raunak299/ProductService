"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Order, {
        onDelete: "CASCADE",
        foreignKey: "orderId",
      });
    }
  }
  OrderItem.init(
    {
      productId: { type: DataTypes.STRING, allowNull: false },
      orderId: { type: DataTypes.INTEGER, allowNull: false },
      quantity: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "OrderItem",
    }
  );
  return OrderItem;
};
