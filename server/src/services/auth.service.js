const bcrypt = require("bcryptjs");
const cloudinary = require("../config/cloudinary");
const {createAdminNotificationService} = require("./admin.service");
const streamifier = require("streamifier");
const User = require("../models/user.model");
const generateAccountNumber = require("../utils/generateAccountNumber");
const generateOTP = require("../utils/generateOTP");
const {createNotificationService }= require("./notification.service");
const registerService = async (userData, file) => {
  const {
    fullName,
    email,
    password,
    phoneNumber,
    dateOfBirth,
    fathersName,
    address,
    kycDocumentNumber,
    accountType,
  } = userData;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const error = new Error("Email already exists");
    error.status = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const accountNumber = generateAccountNumber();

  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
    phoneNumber,
    dateOfBirth,
    fathersName,
    address,
    kycDocumentNumber,
    accountType,
    accountNumber,
  });
  if (file) {
    const result = await uploadToCloudinary(
      file.buffer,
      "banking/kyc"
    );
    user.kycDocument = result.secure_url;
    user.kycStatus = "Pending";
    await user.save();
  }
  await createAdminNotificationService({
    title: "New User Registered",
    message: `${user.fullName} created a new account.`,
    type: "User",
    priority: "Medium",
  });
  await createNotificationService({
    user: user._id,
    title: "Welcome to Nexa Bank",
    message:
      "Your account has been created successfully. Welcome to Nexa Bank!",
    type: "System",
  });
  // Password response se remove
  return await User.findById(user._id).select("-password");
};


const uploadProfileService = async (userId, file) => {

  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  const result = await uploadToCloudinary(
    file.buffer,
    "banking/profile"
  );

  user.profileImage = result.secure_url;

  await user.save();

  return result.secure_url;

};

const uploadKYCService = async (userId, file) => {

  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  const result = await uploadToCloudinary(
    file.buffer,
    "banking/kyc"
  );

  user.kycDocument = result.secure_url;
  user.isVerified = false;

  await user.save();

  return result.secure_url;

};

const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {

    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
      },
      (error, result) => {

        if (error) return reject(error);

        resolve(result);

      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);

  });
};

const forgotPasswordService = async ({ email }) => {

  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  const otp = generateOTP();

  user.resetOTP = otp;

  user.resetOTPExpires = Date.now() + 10 * 60 * 1000;

  await user.save();

  return {
    message: "OTP generated successfully",
    otp, // Development ke liye. Baad me email bhejenge aur isko remove kar denge.
  };

};

const verifyOTPService = async ({
  email,
  otp,
}) => {

  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  if (user.resetOTP !== otp) {
    const error = new Error("Invalid OTP");
    error.status = 400;
    throw error;
  }

  if (user.resetOTPExpires < Date.now()) {
    const error = new Error("OTP Expired");
    error.status = 400;
    throw error;
  }

  return {
    message: "OTP Verified Successfully",
  };

};

const resetPasswordService = async ({
  email,
  otp,
  newPassword,
}) => {

  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  if (user.resetOTP !== otp) {
    const error = new Error("Invalid OTP");
    error.status = 400;
    throw error;
  }

  if (user.resetOTPExpires < Date.now()) {
    const error = new Error("OTP Expired");
    error.status = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    10
  );

  user.password = hashedPassword;

  user.resetOTP = null;
  user.resetOTPExpires = null;

  await user.save();

  return {
    message: "Password Reset Successfully",
  };

};

const verifyPasswordService = async (
  userId,
  password
) => {

  const user = await User.findById(userId);

  if (!user) {

    const error = new Error("User not found");

    error.status = 404;

    throw error;

  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {

    const error = new Error(
      "Invalid password"
    );

    error.status = 401;

    throw error;

  }

  return true;

};

module.exports = {
  registerService,
  uploadProfileService,
  uploadKYCService,
  forgotPasswordService,
  verifyOTPService,
  resetPasswordService,
  verifyPasswordService,
};