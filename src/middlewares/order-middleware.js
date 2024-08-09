const { StatusCodes } = require("http-status-codes");

const createOrderValidator = (req, res, next) => {
  const { userId, address } = req.body;
  if (
    !userId ||
    !address ||
    !address.name ||
    !address.mobileNumber ||
    !address.alternateMobileNumber ||
    !address.city ||
    !address.state ||
    !address.pincode
  ) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      data: {},
      success: false,
      message: "Invalid request ",
      err: "Missing mandatory properties to place order",
    });
  }

  next();
};

const getOrdersValidator = (req, res, next) => {
  if (!req.body.userId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      data: {},
      success: false,
      message: "Invalid request ",
      err: "Missing mandatory properties to get order details",
    });
  }

  next();
};

module.exports = {
  createOrderValidator,
  getOrdersValidator,
};
