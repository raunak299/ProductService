const express = require("express");
const userApiRoutes = require("./user");
const {
  ProductController,
  WishlistController,
  CartController,
} = require("../../controller");
const {
  flightMiddleware,
  wishlistMiddleware,
  cartMiddleware,
} = require("../../middlewares");

const router = express.Router();

router.use("/user", userApiRoutes);

router.get("/product", ProductController.getAll);
router.get(
  "/product/:id",
  flightMiddleware.validateProductGetRequest,
  ProductController.get
);

router.post(
  "/wishlist",
  wishlistMiddleware.createWishlistValidator,
  WishlistController.create
);

router.post("/cart", cartMiddleware.createCartValidator, CartController.create);

module.exports = router;
