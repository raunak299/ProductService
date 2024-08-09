"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here
      this.hasMany(models.OrderItem, {
        foreignKey: "orderId",
      });
    }
  }

  Order.init(
    {
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false, // Corrected from `all` to `allowNull`
      },
      alternateMobileNumber: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pinCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      addressDetail: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Order",
      getterMethods: {
        addressObject() {
          return {
            name: this.name,
            mobileNumber: this.mobileNumber,
            alternateMobileNumber: this.alternateMobileNumber,
            city: this.city,
            state: this.state,
            pinCode: this.pinCode,
            addressDetail: this.addressDetail,
          };
        },
      },
    }
  );

  return Order;
};
