// src/controllers/authController.js
const bcryptjs = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const Joi = require("joi");
const User = require("../model/auth");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const signupSchema = Joi.object({
  username: Joi.string().min(2).max(50).required().messages({
    "any.required": " Tên người dùng là bắt buộc",
    "string.empty": " Tên người dùng không được để trống",
    "string.min": " Tên người dùng có ít nhất {#limit} ký tự",
    "string.max": " Tên người dùng được vượt quá {#limit} ký tự",
  }),
  email: Joi.string().email().required().messages({
    "any.required": " Email là bắt buộc",
    "string.empty": " Email không được để trống",
    "string.email": " Email phải là email hợp lệ",
  }),
  password: Joi.string().min(6).max(30).required().messages({
    "any.required": " Password là bắt buộc",
    "string.empty": " Password không được để trống",
    "string.min": " Password phải có ít nhất {#limit} ký tự",
    "string.max": " Password không được vượt quá {#limit} ký tự",
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.required": " Confirm Password là bắt buộc",
    "any.only": "Mật khẩu không trùng khớp",
  }),
  phoneNumber: Joi.string().min(10).max(20).required().messages({
    "any.required": " Số điện thoại là bắt buộc",
    "string.empty": " Số điện thoại không được để trống",
    "string.min": " Số điện thoại phải có ít nhất {#limit} ký tự",
    "string.max": " Số điện thoại không được vượt quá {#limit} ký tự",
  }),
});

const signup = async (req, res) => {
  const { email, password, phoneNumber } = req.body;
  const { error } = signupSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map((item) => item.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ messages });
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      messages: ["Email đã tồn tại"],
    });
  }

  const hashedPassword = await bcryptjs.hash(password, 12);
  const role = (await User.countDocuments({})) === 0 ? "admin" : "user";

  const user = await User.create({
    ...req.body,
    password: hashedPassword,
    role,
  });

  return res.status(StatusCodes.CREATED).json({ user });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      messages: ["Email không tồn tại"],
    });
  }

  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      messages: ["Mật khẩu không chính xác"],
    });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return res.status(StatusCodes.OK).json({
    user,
    token,
  });
};

module.exports = { signup, signin };
