const asyncHandler = require("../utils/asyncHandler");
const PDFDocument = require("pdfkit");
const ExcelJS = require("exceljs");
const {
  getDashboardService,
  getAllUsersService,
  blockUserService,
  deleteUserService,
  getUserByIdService,
  verifyKycService,
  rejectKycService,
  getAllTransactionsService,
  getReportsService,
  exportPdfReportService,
  exportExcelReportService,
  getAdminProfileService,
  updateAdminProfileService,
  getAdminNotificationsService,
  markAdminNotificationReadService,
  markAllAdminNotificationsReadService,
  deleteAdminNotificationService,
} = require("../services/admin.service");

// =========================
// Dashboard
// =========================
const getDashboard = asyncHandler(async (req, res) => {
  const dashboard = await getDashboardService();

  res.status(200).json({
    success: true,
    data: dashboard,
  });
});

// =========================
// Get All Users
// =========================
const getAllUsers = asyncHandler(async (req, res) => {
  const result = await getAllUsersService(req.query);

  res.status(200).json({
    success: true,
    totalUsers: result.totalUsers,
    currentPage: result.currentPage,
    totalPages: result.totalPages,
    data: result.users,
  });
});

// =========================
// Block User
// =========================
const blockUser = asyncHandler(async (req, res) => {
  const isBlocked = await blockUserService(req.params.id);

  res.status(200).json({
    success: true,
    message: isBlocked
      ? "User Blocked Successfully"
      : "User Unblocked Successfully",
  });
});

// =========================
// Delete User
// =========================
const deleteUser = asyncHandler(async (req, res) => {
  await deleteUserService(req.params.id);

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
// =========================
// Get User By ID
// =========================
const getUserById = asyncHandler(async (req, res) => {

  const user = await getUserByIdService(
    req.params.id
  );

  res.status(200).json({
    success: true,
    data: user,
  });

});

// =========================
// Verify KYC
// =========================
const verifyKyc = asyncHandler(async (req, res) => {

  await verifyKycService(
    req.params.id
  );

  res.status(200).json({
    success: true,
    message: "KYC Verified Successfully",
  });

});

// =========================
// Reject KYC
// =========================
const rejectKyc = asyncHandler(async (req, res) => {

  await rejectKycService(req.params.id);

  res.status(200).json({
    success: true,
    message: "KYC Rejected Successfully",
  });

});

// =========================
// Get All Transactions
// =========================
const getAllTransactions =
  asyncHandler(async (req, res) => {

    const result =
      await getAllTransactionsService(
        req.query
      );

    res.status(200).json({

      success: true,

      totalTransactions:
        result.totalTransactions,

      currentPage:
        result.currentPage,

      totalPages:
        result.totalPages,

      data:
        result.transactions,

    });

  });

  // =========================
// Reports
// =========================
const getReports =
asyncHandler(async (req, res) => {

  const reports =
    await getReportsService();

  res.status(200).json({

    success: true,

    data: reports,

  });

});

// =========================
// Export PDF
// =========================
const exportPdfReport =
asyncHandler(async (req, res) => {

  const transactions =
    await exportPdfReportService();

  const doc = new PDFDocument({
    margin: 40,
    size: "A4",
  });

  res.setHeader(
    "Content-Type",
    "application/pdf"
  );

  res.setHeader(
    "Content-Disposition",
    "attachment; filename=bank-report.pdf"
  );

  doc.pipe(res);

  doc
    .fontSize(22)
    .text("Nexa Bank Report");

  doc.moveDown();

  transactions.forEach((item) => {

    doc
      .fontSize(12)
      .text(
  `Type : ${item.type}
  
  Amount : ₹${item.amount}
  
  Sender : ${
    item.sender
      ? item.sender.fullName
      : "Bank"
  }
  
  Receiver : ${
    item.receiver
      ? item.receiver.fullName
      : "Bank"
  }
  
  Description : ${
    item.description || "-"
  }
  
  Date : ${item.createdAt.toLocaleString()}
  `
      );
  
    doc.moveDown();
  
  });

  doc.end();

});

// =========================
// Export Excel
// =========================
const exportExcelReport =
asyncHandler(async (req, res) => {

  const transactions =
    await exportExcelReportService();

  const workbook =
    new ExcelJS.Workbook();

  const sheet =
    workbook.addWorksheet("Transactions");

  sheet.columns = [
    {
      header: "Type",
      key: "type",
      width: 18,
    },
    {
      header: "Amount",
      key: "amount",
      width: 15,
    },
    {
      header: "Sender",
      key: "sender",
      width: 25,
    },
    {
      header: "Receiver",
      key: "receiver",
      width: 25,
    },
    {
      header: "Description",
      key: "description",
      width: 30,
    },
    {
      header: "Date",
      key: "date",
      width: 25,
    },
  ];

  transactions.forEach((item) => {

    sheet.addRow({

      type: item.type,

      amount: item.amount,

      sender: item.sender
        ? item.sender.fullName
        : "Bank",

      receiver: item.receiver
        ? item.receiver.fullName
        : "Bank",

      description:
        item.description || "-",

      date:
        item.createdAt.toLocaleString(),

    });

  });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  res.setHeader(
    "Content-Disposition",
    "attachment; filename=Nexa-Bank-Report.xlsx"
  );

  await workbook.xlsx.write(res);

  res.end();

});

// =========================
// Get Admin Profile
// =========================
const getAdminProfile =
asyncHandler(async (req, res) => {

  const admin =
    await getAdminProfileService(
      req.user.id
    );

  res.status(200).json({

    success: true,

    data: admin,

  });

});

// =========================
// Update Admin Profile
// =========================
const updateAdminProfile =
asyncHandler(async (req, res) => {

  const admin =
    await updateAdminProfileService(
      req.user.id,
      req.body
    );

  res.status(200).json({

    success: true,

    message:
      "Profile Updated Successfully",

    data: admin,

  });

});

// =========================
// Get Admin Notifications
// =========================
const getAdminNotifications =
asyncHandler(async (req, res) => {

  const result =
    await getAdminNotificationsService();

  res.status(200).json({

    success: true,

    unreadCount:
      result.unreadCount,

    data:
      result.notifications,

  });

});

// =========================
// Mark Notification As Read
// =========================
const markAdminNotificationRead =
asyncHandler(async (req, res) => {

  await markAdminNotificationReadService(
    req.params.id
  );

  res.status(200).json({

    success: true,

    message:
      "Notification marked as read",

  });

});

// =========================
// Mark All Notifications Read
// =========================
const markAllAdminNotificationsRead =
asyncHandler(async (req, res) => {

  await markAllAdminNotificationsReadService();

  res.status(200).json({

    success: true,

    message:
      "All notifications marked as read",

  });

});

// =========================
// Delete Notification
// =========================
const deleteAdminNotification =
asyncHandler(async (req, res) => {

  await deleteAdminNotificationService(
    req.params.id
  );

  res.status(200).json({

    success: true,

    message:
      "Notification deleted",

  });

});
module.exports = {
  getDashboard,
  getAllUsers,
  blockUser,
  deleteUser,
  getUserById,
  verifyKyc,
  rejectKyc,
  getAllTransactions,
  getReports,
  exportPdfReport,
  exportExcelReport,
  getAdminProfile,
  updateAdminProfile,
  getAdminNotifications,
  markAdminNotificationRead,
  markAllAdminNotificationsRead,
  deleteAdminNotification,
};