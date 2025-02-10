const Color = require("../model/color"); // Import color model

// Lấy danh sách tất cả color
const getColors = async (req, res) => {
  try {
    const colors = await Color.find(); // Lấy tất cả color từ database
    res.json(colors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy color theo ID
const getColorById = async (req, res) => {
  try {
    const color = await Color.findById(req.params.id); // Tìm color theo ID
    if (!color) return res.status(404).json({ message: "Color not found" });
    res.json(color);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Thêm mới color
const createColor = async (req, res) => {
  const { name, imageColor, active } = req.body;

  try {
    // Kiểm tra xem color đã tồn tại hay chưa
    const colorExists = await Color.findOne({ name });
    if (colorExists) {
      return res.status(400).json({ message: "Color already exists" });
    }

    const color = new Color({
      name,
      imageColor,
      active,
    });

    await color.save(); // Lưu vào database

    res.status(201).json(color); // Trả về color đã được tạo
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Cập nhật thông tin color
const updateColor = async (req, res) => {
  const { name, imageColor, active } = req.body;

  try {
    const color = await Color.findByIdAndUpdate(
      req.params.id,
      { name, imageColor, active },
      { new: true } // Trả về color mới sau khi cập nhật
    );
    if (!color) return res.status(404).json({ message: "Color not found" });

    res.json(color); // Trả về color đã được cập nhật
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const toggleColorActive = async (req, res) => {
  try {
    const color = await Color.findById(req.params.id);
    if (!color) return res.status(404).json({ message: "Color not found" });

    color.active = !color.active;
    await color.save();

    res.json({
      message: `Color is now ${color.active ? "active" : "inactive"}`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa color theo ID
const deleteColor = async (req, res) => {
  try {
    const color = await Color.findByIdAndDelete(req.params.id); // Xóa color theo ID
    if (!color) return res.status(404).json({ message: "Color not found" });

    res.json({ message: "Color deleted successfully" }); // Thông báo xóa thành công
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getColors,
  getColorById,
  createColor,
  updateColor,
  deleteColor,
  toggleColorActive,
};
