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
    timestamps: true,
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
    },
    versionKey: false,
  }
);

// Xuất model Category
module.exports = mongoose.model("Category", categorySchema);
