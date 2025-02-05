const Category = require("../model/category"); // Import category model

// Lấy danh sách tất cả category
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find(); // Lấy tất cả category từ database
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy category theo ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id); // Tìm category theo ID
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Thêm mới category
const createCategory = async (req, res) => {
  const { name, imageCategory, active } = req.body;

  try {
    // Kiểm tra xem category đã tồn tại hay chưa
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = new Category({
      name,
      imageCategory,
      active,
    });

    await category.save(); // Lưu vào database

    res.status(201).json(category); // Trả về category đã được tạo
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Cập nhật thông tin category
const updateCategory = async (req, res) => {
  const { name, imageCategory, active } = req.body;

  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, imageCategory, active },
      { new: true } // Trả về category mới sau khi cập nhật
    );
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    res.json(category); // Trả về category đã được cập nhật
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const toggleCategoryActive = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    category.active = !category.active;
    await category.save();

    res.json({
      message: `Category is now ${category.active ? "active" : "inactive"}`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa category theo ID
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id); // Xóa category theo ID
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    res.json({ message: "Category deleted successfully" }); // Thông báo xóa thành công
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  toggleCategoryActive,
};
