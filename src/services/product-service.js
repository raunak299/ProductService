const CrudService = require("./crud-service");
const {} = require("../models/");
const { ProductRepository } = require("../repository");

class ProductService extends CrudService {
  constructor() {
    const productRepository = new ProductRepository();
    super(productRepository);
  }
}

module.exports = ProductService;
