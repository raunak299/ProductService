const express = require("express");
const { WishlistController } = require("../../../controller");
const { CartController } = require("../../../controller");
const router = express.Router();

router.post("/wishlist", WishlistController.addProductsToWishlist);
router.get("/wishlist", WishlistController.getAllProductsFromWishlist);
router.delete(
  "/wishlist/:productId",
  WishlistController.removeProductFromWishlist
);

router.post("/cart", CartController.addProductToCart);
router.delete("/cart/:productId", CartController.removeProductFromCart);
router.get("/cart", CartController.getAllProductsFromCart);

module.exports = router;
