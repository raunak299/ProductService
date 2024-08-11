const { default: axios } = require("axios");
const { CartRepository } = require("../repository");
const { ServiceLayerErrorHandler } = require("../utils/errors");
const CrudService = require("./crud-service");

class CartService extends CrudService {
  constructor() {
    const cartRepository = new CartRepository();
    super(cartRepository);
    this.cartRepository = cartRepository;
  }

  async destroyCart(data) {
    try {
      const response = await this.cartRepository.delete(data);
      return response;
    } catch (err) {
      console.log("Something went wrong in cart service");
      ServiceLayerErrorHandler(
        err,
        "Something went wrong, please try again later",
        err.message
      );
    }
  }

  async addProductToCart(data) {
    const { userId } = data;
    try {
      const response = await this.cartRepository.addProductToCart(data);
      await this.cartRepository.updateCartTotalAmount(userId);
      return response;
    } catch (err) {
      console.log("Something went wrong in cart service");
      ServiceLayerErrorHandler(
        err,
        "Something went wrong, please try again later",
        err.message
      );
    }
  }

  async removeProductFromCart(userId, productId) {
    try {
      const response = await this.cartRepository.removeProductFromCart(
        userId,
        productId
      );
      await this.cartRepository.updateCartTotalAmount(userId);
      return response;
    } catch (err) {
      console.log("Something went wrong in cart service");
      ServiceLayerErrorHandler(
        err,
        "Something went wrong, please try again later",
        err.message
      );
    }
  }

  async getAllProductsFromCart(userId) {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/v1/user/${userId}`
      );
      const user = response.data.data;
      if (!user) throw new Error("user does not exist");
      const result = await this.cartRepository.getAllProductsFromCart(user.id);
      return result;
    } catch (err) {
      console.log(err);
      console.log("Something went wrong in cart service");
      ServiceLayerErrorHandler(
        err,
        "Something went wrong, please try again later",
        err.message
      );
    }
  }
}

module.exports = CartService;
