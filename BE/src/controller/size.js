const Size = require("../model/size"); // Import size model

// Lấy danh sách tất cả size
const getSizes = async (req, res) => {
  try {
    const sizes = await Size.find(); // Lấy tất cả size từ database
    res.json(sizes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy size theo ID
const getSizeById = async (req, res) => {
  try {
    const size = await Size.findById(req.params.id); // Tìm size theo ID
    if (!size) return res.status(404).json({ message: "Size not found" });
    res.json(size);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Thêm mới size
const createSize = async (req, res) => {
  const { name, imageSize, active } = req.body;

  try {
    // Kiểm tra xem size đã tồn tại hay chưa
    const sizeExists = await Size.findOne({ name });
    if (sizeExists) {
      return res.status(400).json({ message: "Size already exists" });
    }

    const size = new Size({
      name,
      imageSize,
      active,
    });

    await size.save(); // Lưu vào database

    res.status(201).json(size); // Trả về size đã được tạo
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Cập nhật thông tin size
const updateSize = async (req, res) => {
  const { name, imageSize, active } = req.body;

  try {
    const size = await Size.findByIdAndUpdate(
      req.params.id,
      { name, imageSize, active },
      { new: true } // Trả về size mới sau khi cập nhật
    );
    if (!size) return res.status(404).json({ message: "Size not found" });

    res.json(size); // Trả về size đã được cập nhật
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const toggleSizeActive = async (req, res) => {
  try {
    const size = await Size.findById(req.params.id);
    if (!size) return res.status(404).json({ message: "Size not found" });

    size.active = !size.active;
    await size.save();

    res.json({
      message: `Size is now ${size.active ? "active" : "inactive"}`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa size theo ID
const deleteSize = async (req, res) => {
  try {
    const size = await Size.findByIdAndDelete(req.params.id); // Xóa size theo ID
    if (!size) return res.status(404).json({ message: "Size not found" });

    res.json({ message: "Size deleted successfully" }); // Thông báo xóa thành công
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSizes,
  getSizeById,
  createSize,
  updateSize,
  deleteSize,
  toggleSizeActive,
};
