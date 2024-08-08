const express = require("express");
const { WishlistController } = require("../../../controller");
const { CartController } = require("../../../controller");
const { wishlistMiddleware, cartMiddleware } = require("../../../middlewares");
const router = express.Router();

router.post(
  "/wishlist",
  wishlistMiddleware.addProductToWishlistValidator,
  WishlistController.addProductsToWishlist
);
router.get(
  "/wishlist",
  wishlistMiddleware.getAllProductsFromWishlistValidator,
  WishlistController.getAllProductsFromWishlist
);
router.delete(
  "/wishlist/:productId",
  wishlistMiddleware.removeProductFromWishlistValidator,
  WishlistController.removeProductFromWishlist
);

router.post(
  "/cart",
  cartMiddleware.addProductToCartValidator,
  CartController.addProductToCart
);
router.delete(
  "/cart/:productId",
  cartMiddleware.removeProductFromCart,
  CartController.removeProductFromCart
);
router.get(
  "/cart",
  cartMiddleware.getAllProductsFromCart,
  CartController.getAllProductsFromCart
);

module.exports = router;
