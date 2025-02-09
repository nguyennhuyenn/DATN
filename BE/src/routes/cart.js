const express = require("express");
const { addCart, getMyCarts, updateQuantity, removeProduct } = require("../controller/cart");

const router = express.Router();

router.post("/add", addCart);
router.get("/:userId", getMyCarts);
router.put("/update/:id", updateQuantity);
router.delete("/remove/:id", removeProduct);

module.exports = router;
