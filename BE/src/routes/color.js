const express = require("express");
const router = express.Router();
const {
  getColors,
  getColorById,
  createColor,
  updateColor,
  deleteColor,
  toggleColorActive,
} = require("../controller/color");

// Các route cho Color
router.get("/", getColors);
router.get("/:id", getColorById);
router.post("/", createColor);
router.put("/:id", updateColor);
router.delete("/:id", deleteColor);
router.patch("/:id/toggle", toggleColorActive);

module.exports = router;
