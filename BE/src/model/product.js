const mongoose = require("mongoose");

// Định nghĩa schema cho Product
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Liên kết với Category model
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    colors: {
      type: [String],
      required: false,
    },
    sizes: {
      type: [String],
      required: false,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    sku: {
      type: [
        {
          size: String,
          color: String,
          quantity: Number,
        },
      ],
      required: false,
    },
    type: {
      type: String,
      enum: ["quần", "áo", "combo"],
      required: [true, `type is 1 of quần, áo, combo`],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        delete ret._id;
      },
    },
    toObject: {
      virtuals: true,
      transform: (_, ret) => {
        delete ret._id;
      },
      timestamps: true,
      versionKey: false,
    },
  }
);

// Xuất model Product
module.exports = mongoose.model("Product", productSchema);
