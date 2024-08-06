const { Cart } = require("../models/index");
const CrudRepository = require("./crud-repository");

class CartRepository extends CrudRepository {
  constructor() {
    console.log(Cart);
    super(Cart);
  }
}

module.exports = CartRepository;
