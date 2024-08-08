const { StatusCodes } = require("http-status-codes");

const validateProductGetRequest = (req, res, next) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      data: {},
      success: false,
      message: "Invalid request ",
      err: "Missing mandatory properties to get a product",
    });
  }

  next();
};

module.exports = {
  validateProductGetRequest,
};
