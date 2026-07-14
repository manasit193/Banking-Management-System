const authMiddleware = require("../middleware/auth.middleware");
const { registerUser, loginUser, getProfile , uploadProfile, uploadKYC, forgotPassword,verifyOTP, resetPassword, verifyPassword} = require("../controllers/auth.controller");
const { uploadProfile: uploadProfileMiddleware, uploadKYC: uploadKYCMiddleware} = require("../middleware/upload.middleware");
const { registerValidation } = require("../validators/auth.validator");
const validationMiddleware = require("../middleware/validation.middleware");
const { authLimiter } = require("../security/ratelimiter");
const express = require("express");
const router = express.Router();

router.post("/register", authLimiter, uploadKYCMiddleware.single("kycDocument"), registerValidation,validationMiddleware,registerUser);
router.post("/login", authLimiter, loginUser);
router.post("/forgot-password", authLimiter, forgotPassword);
router.post("/verify-otp", authLimiter, verifyOTP);
router.post("/reset-password", authLimiter, resetPassword);
router.get("/profile", authMiddleware, getProfile);
router.post("/upload-profile", authMiddleware, uploadProfileMiddleware.single("profileImage"), uploadProfile);
router.post("/upload-kyc", authMiddleware, uploadKYCMiddleware.single("kycDocument"), uploadKYC);
router.post("/verify-password",authMiddleware, verifyPassword);
module.exports = router;
