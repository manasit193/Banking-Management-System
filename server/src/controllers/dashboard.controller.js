const asyncHandler = require("../utils/asyncHandler");

const {
  getDashboardService,
} = require("../services/dashboard.service");

// =========================
// Dashboard Data
// =========================
const getDashboard = asyncHandler(async (req, res) => {

  const dashboardData = await getDashboardService(
    req.user.id
  );

  res.status(200).json({
    success: true,
    message: "Dashboard Data Fetched Successfully",
    data: dashboardData,
  });

});

module.exports = {
  getDashboard,
};