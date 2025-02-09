const express = require("express");
const authRouter = require("./authRouter");
const productRouter = require("./product");
const categoryRouter = require("./category");
const cartRouter= require("./cart")

const router = express.Router();

// Định nghĩa các route chung
router.get("/", (req, res) => {
  res.send("Welcome to the Home Page");
});

// Import và sử dụng các router khác
router.use("/auth", authRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/cart",cartRouter);

module.exports = router;
