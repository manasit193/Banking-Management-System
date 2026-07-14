const User = require("../models/user.model");

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user || user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Admin Access Only",
      });
    }

    next();

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = adminMiddleware;