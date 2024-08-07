const { StatusCodes } = require("http-status-codes");
const { Cart, Product, CartProduct } = require("../models/index");
const { RepositoryLayerErrorHandler } = require("../utils/errors");
const CrudRepository = require("./crud-repository");

class CartRepository extends CrudRepository {
  constructor() {
    super(Cart);
  }

  async updateCartTotalAmount(userId) {
    try {
      const cart = await Cart.findOne({
        where: {
          userId,
        },
        include: {
          model: Product,
          through: {
            attributes: ["quantity"], // Exclude the join table attributes
          },
        },
      });
      if (!cart) {
        throw new Error("Cart does not exist");
      }
      const newTotalAmount = cart.Products.reduce((acc, product) => {
        return acc + product.price * product.CartProduct.quantity;
      }, 0);

      await super.update(cart.id, { totalAmount: newTotalAmount });
    } catch (err) {
      throw err;
    }
  }

  async addProductToCart(data) {
    const { userId, productId, quantity } = data;

    if (quantity === 0) {
      throw new Error("Quantity cannot be 0");
    }

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

      const cartProduct = await CartProduct.findOne({
        where: {
          cartId: cart.id,
          productId: productId,
        },
      });

      if (cartProduct) {
        cartProduct.quantity = quantity;
        await cartProduct.save();
        return cartProduct;
      }

      const instance = await cart.addProduct(product);
      return instance;
    } catch (err) {
      console.log("Something went wrong in cart repository");
      RepositoryLayerErrorHandler(
        err,
        "Something went wrong, please try again later",
        err.message,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async removeProductFromCart(userId, productId) {
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

      await cart.removeProduct(productId);
      return true;
    } catch (err) {
      console.log("Something went wrong in cart repository");
      RepositoryLayerErrorHandler(
        err,
        "Something went wrong, please try again later",
        err.message,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAllProductsFromCart(userId) {
    try {
      const products = await Cart.findOne({
        where: {
          userId,
        },
        attributes: ["totalAmount"],
        include: {
          model: Product,
          through: {
            attributes: ["quantity"], // Exclude the join table attributes
          },
        },
      });
      return products;
    } catch (err) {
      console.log("Something went wrong in cart repository");
      RepositoryLayerErrorHandler(
        err,
        "Something went wrong, please try again later",
        err.message,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = CartRepository;
