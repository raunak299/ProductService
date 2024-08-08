const { ProductService } = require("../services");
const { StatusCodes } = require("http-status-codes");

const productService = new ProductService();

const get = async (req, res) => {
  try {
    const productId = req.params.id;
    const response = await productService.get(productId);
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
    const {
      size,
      category,
      rating,
      maxPrice,
      minPrice,
      sortField,
      sortDirection,
    } = req.query;
    const data = {
      size,
      category,
      rating,
      maxPrice,
      minPrice,
      sortField,
      sortDirection,
    };
    const response = await productService.getAll(data);
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
