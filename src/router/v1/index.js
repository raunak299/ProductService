const express = require("express");
const userApiRoutes = require("./user");
const { ProductController } = require("../../controller");
const { WishlistController } = require("../../controller");

const router = express.Router();

router.use("/user", userApiRoutes);

router.get("/product", ProductController.getAll);
router.get("/product/:id", ProductController.get);

router.post("/wishlist", WishlistController.create);

module.exports = router;
