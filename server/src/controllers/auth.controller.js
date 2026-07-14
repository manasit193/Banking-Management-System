const asyncHandler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { registerService , uploadProfileService, uploadKYCService, forgotPasswordService,verifyOTPService, resetPasswordService, verifyPasswordService} = require("../services/auth.service");

// =========================
// Register User
// =========================
const registerUser = asyncHandler(async (req, res) => {
  const user = await registerService(req.body, req.file);

  res.status(201).json({
    success: true,
    message: "User Registered Successfully",
    data: user,
  });
});

// =========================
// Login User
// =========================
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  const bcrypt = require("bcryptjs");
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const error = new Error("Invalid Credentials");
    error.status = 401;
    throw error;
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  // Password remove
  const userData = await User.findById(user._id).select("-password");

  res.status(200).json({
    success: true,
    message: "Login Successful",
    token,
    user: userData,
  });
});

// =========================
// Get Profile
// =========================
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

const uploadProfile = asyncHandler(async (req, res) => {
  if (!req.file) {
    const error = new Error("Profile image is required");
    error.status = 400;
    throw error;
  }

  const image = await uploadProfileService(
    req.user.id,
    req.file
  );

  res.status(200).json({
    success: true,
    message: "Profile Image Uploaded Successfully",
    image,
  });

});

const uploadKYC = asyncHandler(async (req, res) => {
  if (!req.file) {
    const error = new Error("KYC document is required");
    error.status = 400;
    throw error;
  }

  const document = await uploadKYCService(
    req.user.id,
    req.file
  );

  res.status(200).json({
    success: true,
    message: "KYC Uploaded Successfully",
    document,
  });

});

const forgotPassword = asyncHandler(async (req, res) => {

  const result = await forgotPasswordService(req.body);

  res.status(200).json({
    success: true,
    message: result.message,
    otp: result.otp,
  });

});

const verifyOTP = asyncHandler(async (req, res) => {

  const result = await verifyOTPService(req.body);

  res.status(200).json({
    success: true,
    message: result.message,
    otp: result.otp,
  });

});

const resetPassword = asyncHandler(async (req, res) => {

  const result = await resetPasswordService(req.body);

  res.status(200).json({
    success: true,
    message: result.message,
    otp: result.otp,
  });

});

const verifyPassword = asyncHandler(
  async (req, res) => {

    const { password } = req.body;

    await verifyPasswordService(
      req.user.id,
      password
    );

    res.status(200).json({

      success: true,

      message:
        "Password verified successfully",

    });

  }
);

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  uploadProfile,
  uploadKYC,
  forgotPassword,
  verifyOTP,
  resetPassword,
  verifyPassword,
};