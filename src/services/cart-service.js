const { CartRepository } = require("../repository");
const { ServiceLayerErrorHandler } = require("../utils/errors");
const CrudService = require("./crud-service");

class CartService extends CrudService {
  constructor() {
    const cartRepository = new CartRepository();
    super(cartRepository);
    this.cartRepository = cartRepository;
  }

  async addProductToCart(data) {
    try {
      const response = await this.cartRepository.addProductToCart(data);
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
}

module.exports = CartService;
