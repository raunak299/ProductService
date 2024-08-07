const { Cart, Product } = require("../models/index");
const CrudRepository = require("./crud-repository");

class CartRepository extends CrudRepository {
  constructor() {
    super(Cart);
  }

  async addProductToCart(data) {
    const { userId, productId, quantity } = data;

    try {
      const cart = await Cart.findOne({
        where: {
          userId: userId,
        },
      });
      if (!cart) {
        throw new Error("Cart does not exist for the user");
      }

      const product = await Product.findByPk(productId);
      if (!product) {
        throw new Error("Product does not exist");
      }

      const instance = await cart.addProduct(product, {
        through: { quantity: quantity },
      });

      return instance;
    } catch (err) {
      console.log(err);
      console.log("Something went wrong in cart repository");
      throw err;
    }
  }
}

module.exports = CartRepository;
