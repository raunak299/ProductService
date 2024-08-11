const { StatusCodes } = require("http-status-codes");

const addProductToWishlistValidator = (req, res, next) => {
  if (!req.body.userId || !req.body.productId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      data: {},
      success: false,
      message: "Invalid request ",
      err: "Missing mandatory properties to add a product to wishlist",
    });
  }
  next();
};

const removeProductFromWishlistValidator = (req, res, next) => {
  if (!req.body.userId || !req.params.productId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      data: {},
      success: false,
      message: "Invalid request ",
      err: "Missing mandatory properties to remove a product to wishlist",
    });
  }
  next();
};

const getAllProductsFromWishlistValidator = (req, res, next) => {
  if (!req.body.userId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      data: {},
      success: false,
      message: "Invalid request ",
      err: "Missing mandatory properties to get product from wishlist",
    });
  }
  next();
};

const createWishlistValidator = (req, res, next) => {
  if (!req.body.userId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      data: {},
      success: false,
      message: "Invalid request ",
      err: "Missing mandatory properties to create wishlist",
    });
  }
  next();
};

module.exports = {
  addProductToWishlistValidator,
  removeProductFromWishlistValidator,
  getAllProductsFromWishlistValidator,
  createWishlistValidator,
};
