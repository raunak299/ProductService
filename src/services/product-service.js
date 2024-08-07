const CrudService = require("./crud-service");
const {} = require("../models/");
const { ProductRepository } = require("../repository");
const { ServiceLayerErrorHandler } = require("../utils/errors");

class ProductService extends CrudService {
  constructor() {
    const productRepository = new ProductRepository();
    super(productRepository);
  }

  async getAll(data) {
    try {
      const result = await this.crudRepository.getAll(data);
      return result;
    } catch (err) {
      console.log("Something went wrong in product service");
      ServiceLayerErrorHandler(
        err,
        "Something went wrong, please try again later",
        err.message
      );
    }
  }
}

module.exports = ProductService;
