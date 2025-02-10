const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  toggleProductActive,
  deleteProduct,
  getProductsPaginate,
} = require("../controller/product");

router.get("/", getProducts);
router.get("/paginate", getProductsPaginate);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.patch("/:id/toggle", toggleProductActive);
router.delete("/:id", deleteProduct);

module.exports = router;
