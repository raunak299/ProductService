const { StatusCodes } = require("http-status-codes");
const { WishListService } = require("../services");

const wishListService = new WishListService();

const create = async (req, res) => {
  try {
    const payload = req.body;
    const response = await wishListService.create(payload);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully created wishlist",
      data: response,
      err: {},
    });
  } catch (err) {
    console.log("Something went wrong in wishlist controller ");
    res.status(StatusCodes.BAD_GATEWAY).json({
      success: false,
      message: "Something went wrong in wishlist creation",
      data: {},
      err: err.message,
    });
  }
};

const getAllProductsFromWishlist = async (req, res) => {
  try {
    const userId = req.body.userId;
    const response = await wishListService.getAllProductsFromWishlist(userId);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully fetched wishlist products",
      data: response,
      err: {},
    });
  } catch (err) {
    console.log("Something went wrong in wishlist controller ");
    res.status(StatusCodes.BAD_GATEWAY).json({
      success: false,
      message: "Something went wrong .. unable to get wishlist products",
      data: {},
      err: err.message,
    });
  }
};

const addProductsToWishlist = async (req, res) => {
  try {
    const payload = req.body;
    const response = await wishListService.addProductsToWishlist(payload);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully added product to wishlist",
      data: response,
      err: {},
    });
  } catch (err) {
    console.log("Something went wrong in wishlist controller");
    console.log("controller", err);
    res.status(StatusCodes.BAD_GATEWAY).json({
      success: false,
      message: "Something went wrong .. unable to add product to wishlist",
      data: {},
      err: err.message,
    });
  }
};

const removeProductFromWishlist = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.body.userId;
    const response = await wishListService.removeProductFromWishlist(
      userId,
      productId
    );
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully deleted a product from wishlist",
      data: response,
      err: {},
    });
  } catch (err) {
    console.log("Something went wrong in wishlist controller ");
    console.log("controller", err);
    res.status(StatusCodes.BAD_GATEWAY).json({
      success: false,
      message: "Something went wrong .. unable to add product to wishlist",
      data: {},
      err: err.message,
    });
  }
};

module.exports = {
  create,
  addProductsToWishlist,
  getAllProductsFromWishlist,
  removeProductFromWishlist,
};
