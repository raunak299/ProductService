const { StatusCodes } = require("http-status-codes");
const { Order, OrderItem, Product } = require("../models/index");
const { RepositoryLayerErrorHandler } = require("../utils/errors");
const CrudRepository = require("./crud-repository");
const { toDefaultValue } = require("sequelize/lib/utils");

class OrderRepository extends CrudRepository {
  constructor() {
    super(Order);
  }

  async createOrder(userId, products, totalAmount, address) {
    const payload = {
      userId,
      name: address.name,
      mobileNumber: address.mobileNumber,
      alternateMobileNumber: address.alternateMobileNumber,
      city: address.city,
      state: address.state,
      pinCode: address.pincode,
      addressDetail: address.addressDetail,
      totalAmount,
    };
    try {
      const order = await Order.create({ ...payload });
      const orderItems = products.map((orderItem) => {
        return {
          orderId: order.id,
          ...orderItem,
        };
      });
      await OrderItem.bulkCreate(orderItems);
      return { orderId: order.id };
    } catch (err) {
      console.log(err);
      console.log(err);
      console.log("something went wrong in order repository ");
      RepositoryLayerErrorHandler(
        err,
        "Something went wrong, please try again later",
        err.message,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getOrders(userId) {
    try {
      const orders = await Order.findOne({
        where: {
          userId,
        },
      });
      const orderItems = await OrderItem.findAll({
        where: {
          orderId: orders.id,
        },
      });
      const orderWithAddress = {
        id: orders.id,
        userId: orders.userId,
        totalAmount: orders.totalAmount,
        address: {
          name: orders.name,
          mobileNumber: orders.mobileNumber,
          alternateMobileNumber: orders.alternateMobileNumber,
          city: orders.city,
          state: orders.state,
          pinCode: orders.pinCode,
          addressDetail: orders.addressDetail,
        },
        orderItems,
      };
      return orderWithAddress;
    } catch (err) {
      console.log(err);
      console.log("something went wrong in order repository ");
      RepositoryLayerErrorHandler(
        err,
        "Something went wrong, please try again later",
        err.message,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = OrderRepository;
