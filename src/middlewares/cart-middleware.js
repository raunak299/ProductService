const { StatusCodes } = require("http-status-codes");

const addProductToCartValidator = (req, res, next) => {
  if (!req.body.userId || !req.body.quantity || !req.body.productId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      data: {},
      success: false,
      message: "Invalid request ",
      err: "Missing mandatory properties to add product to cart",
    });
  }

  next();
};

const removeProductFromCart = (req, res, next) => {
  if (!req.body.userId || !req.params.productId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      data: {},
      success: false,
      message: "Invalid request ",
      err: "Missing mandatory properties to remove product from cart",
    });
  }

  next();
};

const getAllProductsFromCart = (req, res, next) => {
  if (!req.body.userId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      data: {},
      success: false,
      message: "Invalid request ",
      err: "Missing mandatory properties to get products from  cart",
    });
  }

  next();
};

const createCartValidator = (req, res, next) => {
  if (!req.body.userId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      data: {},
      success: false,
      message: "Invalid request ",
      err: "Missing mandatory properties to create cart",
    });
  }

  next();
};

module.exports = {
  addProductToCartValidator,
  removeProductFromCart,
  getAllProductsFromCart,
  createCartValidator,
};
