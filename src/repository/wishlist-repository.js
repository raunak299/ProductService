const { StatusCodes } = require("http-status-codes");
const { Wishlist, Product } = require("../models/index");
const { RepositoryLayerErrorHandler } = require("../utils/errors");
const CrudRepository = require("./crud-repository");

class WishListRepository extends CrudRepository {
  constructor() {
    super(Wishlist);
  }

  async addProductsToWishlist(data) {
    const { userId, productId } = data;

    try {
      const wishlist = await Wishlist.findOne({
        where: {
          userId: userId,
        },
      });
      if (!wishlist) {
        throw new Error("Wishlist does not exist for the user");
      }

      const product = await Product.findByPk(productId);
      if (!product) {
        throw new Error("Product does not exist");
      }

      const instance = await wishlist.addProduct(productId);
      return instance;
    } catch (err) {
      console.log("Something went wrong in wishlist repository");
      RepositoryLayerErrorHandler(
        err,
        "Something went wrong, please try again later",
        err.message,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAllProductsFromWishlist(userId) {
    try {
      const products = await Wishlist.findOne({
        where: {
          userId,
        },
        attributes: [],
        include: {
          model: Product,
          through: {
            attributes: [], // Exclude the join table attributes
          },
        },
      });
      return products;
    } catch (err) {
      console.log("Something went wrong in wishlist repository");
      RepositoryLayerErrorHandler(
        err,
        "Something went wrong, please try again later",
        err.message,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async removeProductFromWishlist(userId, productId) {
    try {
      const wishlist = await Wishlist.findOne({
        where: {
          userId: userId,
        },
      });
      if (!wishlist) {
        throw new Error("Wishlist does not exist for the user");
      }

      const product = await Product.findByPk(userId);
      if (!product) {
        throw new Error("Product does not exist");
      }

      await wishlist.removeProduct(productId);
      return true;
    } catch (err) {
      console.log("Something went wrong in wishlist repository");
      RepositoryLayerErrorHandler(
        err,
        "Something went wrong, please try again later",
        err.message,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = WishListRepository;
