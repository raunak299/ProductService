const { ProductService } = require("../services");
const { StatusCodes } = require("http-status-codes");

const productService = new ProductService();

const get = async (req, res) => {
  try {
    const response = await productService.get(req.params.id);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully fetched product",
      data: response,
      err: {},
    });
  } catch (err) {
    console.log("Something went wrong in get controller");
    return res.status(StatusCodes.BAD_GATEWAY).json({
      success: false,
      message: "Not able to get product",
      data: {},
      err: err,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const response = await productService.getAll(req.query);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully fetched all products",
      data: response,
      err: {},
    });
  } catch (err) {
    console.log("Something went wrong in get controller");
    return res.status(StatusCodes.BAD_GATEWAY).json({
      success: false,
      message: "Not able to get products",
      data: {},
      err: err,
    });
  }
};

module.exports = {
  get,
  getAll,
};
