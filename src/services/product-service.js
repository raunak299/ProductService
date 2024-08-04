const CrudService = require("./crud-service");
const {} = require("../models/");
const { ProductRepository } = require("../repository");

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
      throw err;
    }
  }
}

module.exports = ProductService;
