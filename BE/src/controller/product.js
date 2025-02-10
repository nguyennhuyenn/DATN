const Product = require("../model/product");
const Category = require("../model/category");

// Lấy danh sách sản phẩm
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductsPaginate = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort, ...filter } = req.query;
    const skip = (page - 1) * limit;

    // Xử lý sort query (mặc định không sort)
    const sortOption = sort
      ? { [sort.replace("-", "")]: sort.startsWith("-") ? -1 : 1 }
      : {};

    // Lấy danh sách sản phẩm với phân trang, lọc và sắp xếp
    const products = await Product.find(filter)
      .populate("category", "name")
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    // Đếm tổng số sản phẩm khớp với filter
    const totalItems = await Product.countDocuments(filter);

    res.json({
      data: products,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalItems / limit),
        totalItems,
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy sản phẩm theo ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name"
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Thêm sản phẩm
const createProduct = async (req, res) => {
  const {
    name,
    category,
    price,
    description,
    colors,
    sizes,
    imageUrl,
    type,
    sku,
  } = req.body;

  try {
    const categoryExists = await Category.findById(category);
    if (!categoryExists)
      return res.status(400).json({ message: "Category not found" });

    const product = new Product({
      name,
      category,
      price,
      description,
      colors,
      sizes,
      imageUrl,
      type,
      sku,
    });
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Cập nhật sản phẩm
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Bật/tắt trạng thái sản phẩm (Không xóa)
const toggleProductActive = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.active = !product.active;
    await product.save();

    res.json({
      message: `Product is now ${product.active ? "active" : "inactive"}`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id); // Xóa product theo ID
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" }); // Thông báo xóa thành công
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  toggleProductActive,
  deleteProduct,
  getProductsPaginate,
};
