const { CartService, WishListService } = require("../services");

const cartService = new CartService();
const wishListService = new WishListService();

const subscribeEventHandler = async (message) => {
  const { event, payload } = message;
  switch (event) {
    case "create_user_profile": {
      const data = { userId: payload.userId };
      await cartService.create(data);
      await wishListService.create(data);
      break;
    }
    case "delete_user_profile": {
      const userId = payload.userId;
      await cartService.destroyCart(userId);
      await wishListService.destroyWishlist(userId);
      break;
    }
  }
};

module.exports = subscribeEventHandler;
