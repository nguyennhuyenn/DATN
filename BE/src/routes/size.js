const express = require("express");
const router = express.Router();
const {
  getSizes,
  getSizeById,
  createSize,
  updateSize,
  deleteSize,
  toggleSizeActive,
} = require("../controller/size");

// Các route cho Size
router.get("/", getSizes);
router.get("/:id", getSizeById);
router.post("/", createSize);
router.put("/:id", updateSize);
router.delete("/:id", deleteSize);
router.patch("/:id/toggle", toggleSizeActive);

module.exports = router;
