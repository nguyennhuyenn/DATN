const express = require("express");
const connectDB = require("./db"); // Import connectDB
const router = require("./src/routes/index"); // Import authRouter
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

// Khởi tạo ứng dụng Express
const app = express();

// Kết nối với MongoDB
connectDB();

// Middleware
app.use(express.json()); // Để nhận dữ liệu JSON trong body

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Sử dụng routes
app.use("/api", router);

// Lắng nghe trên cổng
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
