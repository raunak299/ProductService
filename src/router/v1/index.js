const express = require("express");
const { ProductController } = require("../../controller");

const router = express.Router();

router.get("/product", ProductController.getAll);
router.get("/product/:id", ProductController.get);

module.exports = router;
