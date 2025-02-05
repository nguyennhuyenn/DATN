const mongoose = require("mongoose");

// Định nghĩa schema cho Category
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    imageCategory: {
      type: String,
      required: true,
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

// Xuất model Category
module.exports = mongoose.model("Category", categorySchema);
