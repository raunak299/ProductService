const { default: axios } = require("axios");
const { WishListRepository } = require("../repository");
const CrudService = require("./crud-service");
const { ServiceError } = require("../utils/errors");

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
      if (err.name === "RepositoryError" || err.name === "ValidationError") {
        throw err;
      }
      throw new ServiceError(
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
      if (err.name === "RepositoryError" || err.name === "ValidationError") {
        throw err;
      }
      throw new ServiceError(
        "Something went wrong, please try again later",
        err.message
      );
    }
  }

  async getAllProductsFromWishlist(data) {
    const { userId } = data;
    try {
      const response = await axios.get(
        `http://localhost:3001/api/v1/user/${userId}`
      );
      const user = response.data.data;
      if (!user) throw new Error("user does not exist");
      const result = await this.wishlistRepository.getAllProductsFromWishlist(
        data
      );
      return result;
    } catch (err) {
      console.log("Something went wrong in wishlist service");
      if (err.name === "RepositoryError" || err.name === "ValidationError") {
        throw err;
      }

      throw new ServiceError(
        "Something went wrong, please try again later",
        err.message
      );
    }
  }
}

module.exports = WishListService;
