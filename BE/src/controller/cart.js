const CartItem = require("../model/cart");
const Product = require("../model/product");

// Thêm sản phẩm vào giỏ hàng
exports.addCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Sản phẩm không tồn tại" });
        }

        if (quantity > product.stock) {
            return res.status(400).json({ error: "Không đủ số lượng trong kho" });
        }

        let cartItem = await CartItem.findOne({ userId, productId });

        if (cartItem) {
            if (cartItem.quantity + quantity > product.stock) {
                return res.status(400).json({ error: "Số lượng vượt quá tồn kho" });
            }
            cartItem.quantity += quantity;
        } else {
            cartItem = new CartItem({
                userId,
                productId,
                productName: product.name,
                size: product.size,
                color: product.color,
                quantity,
            });
        }

        await cartItem.save();
        res.status(201).json({ message: "Sản phẩm đã thêm vào giỏ hàng", cartItem });
    } catch (error) {
        res.status(500).json({ error: "Lỗi server" });
    }
};

// Lấy danh sách giỏ hàng theo người dùng
exports.getMyCarts = async (req, res) => {
    try {
        const { userId } = req.params;
        const cartItems = await CartItem.find({ userId }).populate("productId");
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ error: "Lỗi server" });
    }
};

// Cập nhật số lượng sản phẩm trong giỏ hàng
exports.updateQuantity = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        const cartItem = await CartItem.findById(id);
        if (!cartItem) {
            return res.status(404).json({ error: "Sản phẩm trong giỏ hàng không tồn tại" });
        }

        const product = await Product.findById(cartItem.productId);
        if (quantity > product.stock) {
            return res.status(400).json({ error: "Không đủ số lượng trong kho" });
        }

        cartItem.quantity = quantity;
        await cartItem.save();
        res.status(200).json({ message: "Cập nhật thành công", cartItem });
    } catch (error) {
        res.status(500).json({ error: "Lỗi server" });
    }
};

// Xóa sản phẩm khỏi giỏ hàng
exports.removeProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await CartItem.findByIdAndDelete(id);
        res.status(200).json({ message: "Sản phẩm đã được xóa khỏi giỏ hàng" });
    } catch (error) {
        res.status(500).json({ error: "Lỗi server" });
    }
};
