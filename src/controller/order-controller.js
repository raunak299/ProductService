const { StatusCodes } = require("http-status-codes");
const OrderService = require("../services/order-service");

const orderService = new OrderService();

const createOrder = async (req, res) => {
  try {
    const payload = {
      userId: req.body.userId,
      address: {
        name: req.body.address.name,
        mobileNumber: req.body.address.mobileNumber,
        alternateMobileNumber: req.body.address.alternateMobileNumber,
        city: req.body.address.city,
        state: req.body.address.state,
        pincode: req.body.address.pincode,
        addressDetail: req.body.address.addressDetail,
      },
    };

    const response = await orderService.createOrder(payload);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully created order for user",
      data: response,
      err: {},
    });
  } catch (err) {
    console.log("Something went wrong in order controller ");
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      data: {},
      err: err.explanation,
    });
  }
};

const getOrders = async (req, res) => {
  const userId = req.body.userId;
  try {
    const response = await orderService.getOrders(userId);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully fetched orders for user",
      data: response,
      err: {},
    });
  } catch (err) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      data: {},
      err: err.explanation,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
};
