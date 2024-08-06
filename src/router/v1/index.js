const express = require("express");
const userApiRoutes = require("./user");
const {
  ProductController,
  WishlistController,
  CartController,
} = require("../../controller");

const router = express.Router();

router.use("/user", userApiRoutes);

router.get("/product", ProductController.getAll);
router.get("/product/:id", ProductController.get);

router.post("/wishlist", WishlistController.create);

router.post("/cart", CartController.create);

module.exports = router;
