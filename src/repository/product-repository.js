const { Product } = require("../models/index");
const CrudRepository = require("./crud-repository");

class ProductRepository extends CrudRepository {
  constructor() {
    super(Product);
  }
}

module.exports = ProductRepository;
