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
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      data: {},
      err: err.explanation,
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
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      data: {},
      err: err.explanation,
    });
  }
};

module.exports = {
  get,
  getAll,
};
