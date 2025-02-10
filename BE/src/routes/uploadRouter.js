const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../utils/cloudinary");

const upload = multer({ storage });

// Các route cho Size
router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded!" });
  }

  res.json({ imageUrl: req.file.path });
});

router.post("/many", upload.array("images", 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded!" });
  }

  const filePaths = req.files.map((file) => file.path);
  res.json({ imageUrls: filePaths });
});

module.exports = router;
