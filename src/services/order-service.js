const { default: axios } = require("axios");
const { OrderRepository, CartRepository } = require("../repository");
const { ServiceLayerErrorHandler } = require("../utils/errors");
const CrudService = require("./crud-service");

class OrderService extends CrudService {
  constructor() {
    const orderRepository = new OrderRepository();
    const cartRepository = new CartRepository();
    super(orderRepository);
    this.orderRepository = orderRepository;
    this.cartRepository = cartRepository;
  }

  async createOrder(data) {
    const { userId, address } = data;
    try {
      const products = await this.cartRepository.getAllProductsFromCart(userId);
      console.log(products);
      if (!products.Products || products.Products.length === 0) {
        throw new Error("no product in cart");
      }
      let filteredProduct = products.Products.map((product) => {
        return {
          productId: product.id,
          quantity: product.CartProduct.quantity,
        };
      });
      const order = await this.orderRepository.createOrder(
        userId,
        filteredProduct,
        products.totalAmount,
        address
      );
      await this.cartRepository.removeAllProductFromCart(userId);
      return order;
    } catch (err) {
      console.log("Something went wrong in order service");
      ServiceLayerErrorHandler(
        err,
        "Something went wrong, please try again later",
        err.message
      );
    }
  }

  async getOrders(userId) {
    try {
      const orders = await this.orderRepository.getOrders(userId);
      return orders;
    } catch (err) {
      console.log("Something went wrong in order service");
      ServiceLayerErrorHandler(
        err,
        "Something went wrong, please try again later",
        err.message
      );
    }
  }
}

module.exports = OrderService;
