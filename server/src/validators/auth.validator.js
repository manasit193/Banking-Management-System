const { body } = require("express-validator");

const registerValidation = [
  body("fullName")
    .notEmpty()
    .withMessage("Full Name is required"),

  body("email")
    .isEmail()
    .withMessage("Valid Email is required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone Number is required"),

  body("dateOfBirth")
    .notEmpty()
    .withMessage("Date of Birth is required"),

  body("fathersName")
    .notEmpty()
    .withMessage("Father's Name is required"),

  body("address")
    .notEmpty()
    .withMessage("Address is required"),

  body("kycDocumentNumber")
    .notEmpty()
    .withMessage("KYC Document Number is required"),

  body("accountType")
    .isIn(["Savings", "Current"])
    .withMessage("Invalid Account Type"),
];

module.exports = {
  registerValidation,
};