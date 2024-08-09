const express = require("express");
const { WishlistController, OrderController } = require("../../../controller");
const { CartController } = require("../../../controller");
const {
  wishlistMiddleware,
  cartMiddleware,
  orderMiddleware,
} = require("../../../middlewares");
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

router.post(
  "/order",
  orderMiddleware.createOrderValidator,
  OrderController.createOrder
);
router.get(
  "/order",
  orderMiddleware.getOrdersValidator,
  OrderController.getOrders
);

module.exports = router;
