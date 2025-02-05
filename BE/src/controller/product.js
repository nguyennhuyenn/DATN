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
  console.log(req.body);

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

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  toggleProductActive,
};
