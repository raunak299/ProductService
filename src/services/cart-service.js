const { CartRepository } = require("../repository");
const CrudService = require("./crud-service");

class CartService extends CrudService {
  constructor() {
    const cartRepository = new CartRepository();
    super(cartRepository);
    this.cartRepository = cartRepository;
  }
}

module.exports = CartService;
