// src/routes/authRouter.js
const express = require("express");
const { signup, signin } = require("../controller/auth"); // Import các hàm từ controller

const router = express.Router();

// Định nghĩa các route cho đăng ký và đăng nhập
router.post("/register", signup);
router.post("/login", signin);

module.exports = router;
