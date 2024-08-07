const { Op } = require("sequelize");
const { Product } = require("../models/index");
const CrudRepository = require("./crud-repository");
const { StatusCodes } = require("http-status-codes");
const { RepositoryLayerErrorHandler } = require("../utils/errors");

class ProductRepository extends CrudRepository {
  constructor() {
    super(Product);
  }

  #createFilter(queryObj) {
    const filters = {};

    // size filter
    if (queryObj.size) {
      Object.assign(filters, { size: queryObj.size });
    }
    // category filter
    if (queryObj.category) {
      Object.assign(filters, { category: queryObj.category });
    }
    //rating filter
    if (queryObj.rating) {
      Object.assign(filters, { rating: { [Op.lte]: queryObj.rating } });
    }
    //max-price min-price filter
    let priceFilter = [];
    if (queryObj.maxPrice) {
      priceFilter.push({ price: { [Op.lte]: queryObj.maxPrice } });
    }
    if (queryObj.minPrice) {
      priceFilter.push({ price: { [Op.gte]: queryObj.minPrice } });
    }
    Object.assign(filters, { [Op.and]: priceFilter });

    return filters;
  }

  #createOrder(queryObj) {
    //sorting logic
    const sortField = queryObj.sortField ?? "rating";
    const sortDirection = queryObj.sortDirection
      ? queryObj.sortDirection.toUpperCase()
      : "ASC";

    const order = [[sortField, sortDirection]];

    return order;
  }

  async getAll(queryObj) {
    try {
      const filters = this.#createFilter(queryObj);
      const order = this.#createOrder(queryObj);
      const instance = await Product.findAll({
        where: filters,
        order: order,
      });
      return instance;
    } catch (err) {
      console.log("Something went wrong in product repository getAll");
      RepositoryLayerErrorHandler(
        err,
        "Something went wrong, please try again later",
        err.message,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = ProductRepository;
