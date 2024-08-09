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
      // define association here
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
        allowNUll: false,
      },
      mobileNumber: {
        type: DataTypes.STRING,
        allowNUll: false,
      },
      alternateMobileNumber: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
        allowNUll: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNUll: false,
      },
      pinCode: {
        type: DataTypes.STRING,
        allowNUll: false,
      },
      addressDetail: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Order",
    },
    {
      getterMethods: {
        addressObject() {
          return {
            name: this.name,
            mobileNumber: this.mobileNumber,
            alternateMobileNumber: this.alternateMobileNumber,
            address: this.address,
            city: this.city,
            state: this.state,
            pinCode: this.pinCode,
            details: this.details,
          };
        },
      },
    }
  );
  return Order;
};
