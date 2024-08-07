const { default: axios } = require("axios");
const { WishListRepository } = require("../repository");
const CrudService = require("./crud-service");
const { ServiceLayerErrorHandler } = require("../utils/errors");

class WishListService extends CrudService {
  constructor() {
    const wishlistRepository = new WishListRepository();
    super(wishlistRepository);
    this.wishlistRepository = wishlistRepository;
  }

  async addProductsToWishlist(data) {
    try {
      const response = await this.wishlistRepository.addProductsToWishlist(
        data
      );
      return response;
    } catch (err) {
      console.log("Something went wrong in wishlist service");
      ServiceLayerErrorHandler(
        err,
        "Something went wrong, please try again later",
        err.message
      );
    }
  }

  async removeProductFromWishlist(userId, productId) {
    try {
      const response = await this.wishlistRepository.removeProductFromWishlist(
        userId,
        productId
      );
      return response;
    } catch (err) {
      console.log("Something went wrong in wishlist service");
      ServiceLayerErrorHandler(
        err,
        "Something went wrong, please try again later",
        err.message
      );
    }
  }

  async getAllProductsFromWishlist(userId) {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/v1/user/${userId}`
      );
      const user = response.data.data;
      if (!user) throw new Error("user does not exist");
      const result = await this.wishlistRepository.getAllProductsFromWishlist(
        user.id
      );
      return result;
    } catch (err) {
      console.log("Something went wrong in wishlist service");
      ServiceLayerErrorHandler(
        err,
        "Something went wrong, please try again later",
        err.message
      );
    }
  }
}

module.exports = WishListService;
