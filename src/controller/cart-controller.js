const { StatusCodes } = require("http-status-codes");
const { CartService } = require("../services");

const cartService = new CartService();

const create = async (req, res) => {
  try {
    const payload = req.body;
    const response = await cartService.create(payload);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully created cart for user",
      data: response,
      err: {},
    });
  } catch (err) {
    console.log("Something went wrong in cart controller ");
    res.status(StatusCodes.BAD_GATEWAY).json({
      success: false,
      message: "Something went wrong in cart creation",
      data: {},
      err: err.message,
    });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const payload = req.body;
    const response = await cartService.addProductToCart(payload);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully added product to cart",
      data: response,
      err: {},
    });
  } catch (err) {
    console.log("Something went wrong in cart controller");
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      data: {},
      err: err.explanation,
    });
  }
};

const removeProductFromCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.body.userId;
    const response = await cartService.removeProductFromCart(userId, productId);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully deleted a product from cart",
      data: response,
      err: {},
    });
  } catch (err) {
    console.log("Something went wrong in cart controller ");
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      data: {},
      err: err.explanation,
    });
  }
};

const getAllProductsFromCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const response = await cartService.getAllProductsFromCart(userId);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully fetched cart products",
      data: response,
      err: {},
    });
  } catch (err) {
    console.log("Something went wrong in cart controller ");
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      data: {},
      err: err.explanation,
    });
  }
};

module.exports = {
  create,
  addProductToCart,
  removeProductFromCart,
  getAllProductsFromCart,
};
