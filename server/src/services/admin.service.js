const User = require("../models/user.model");
const Transaction = require("../models/transaction.model");
const PDFDocument = require("pdfkit");
const ExcelJS = require("exceljs");
const AdminNotification = require("../models/adminNotification.model");
// =========================
// Dashboard
// =========================
const getDashboardService = async () => {
  const totalUsers = await User.countDocuments();

  const totalTransactions = await Transaction.countDocuments();

  const totalBalance = await User.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: "$balance" },
      },
    },
  ]);
  const totalDeposits = await Transaction.aggregate([
    {
      $match: {
        type: "Deposit",
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$amount",
        },
      },
    },
  ]);
  
  const totalWithdrawals = await Transaction.aggregate([
    {
      $match: {
        type: "Withdraw",
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$amount",
        },
      },
    },
  ]);
  
  const totalTransfers = await Transaction.aggregate([
    {
      $match: {
        type: "Transfer",
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$amount",
        },
      },
    },
  ]);
  
  const recentUsers = await User.find()
    .select(
      "fullName email accountNumber accountType createdAt"
    )
    .sort({
      createdAt: -1,
    })
    .limit(5);
  return {
    totalUsers,
    totalTransactions,
    totalBalance: totalBalance[0]?.total || 0,
    totalDeposits: totalDeposits[0]?.total || 0,
    totalWithdrawals: totalWithdrawals[0]?.total || 0,
    totalTransfers: totalTransfers[0]?.total || 0,
    recentUsers,
  };
};

// =========================
// Get All Users
// =========================
const getAllUsersService = async (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;

  const search = query.search || "";
  const sort = query.sort || "createdAt";

  const searchFilter = {
    $or: [
      { fullName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { accountNumber: { $regex: search, $options: "i" } },
    ],
  };

  const users = await User.find(searchFilter)
    .select("-password")
    .sort({ [sort]: 1 })
    .skip(skip)
    .limit(limit);

  const totalUsers = await User.countDocuments(searchFilter);

  return {
    users,
    totalUsers,
    currentPage: page,
    totalPages: Math.ceil(totalUsers / limit),
  };
};

// =========================
// Block User
// =========================
const blockUserService = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  user.isBlocked = !user.isBlocked;

  await user.save();

  await createAdminNotificationService({
    title: user.isBlocked
      ? "User Blocked"
      : "User Unblocked",
  
    message: `${user.fullName} has been ${
      user.isBlocked ? "blocked" : "unblocked"
    }.`,
  
    type: "Security",
  
    priority: "High",
  });

  return user;
};

// =========================
// Delete User
// =========================
const deleteUserService = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  await User.findByIdAndDelete(id);

  await createAdminNotificationService({
    title: "User Deleted",
    message: `${user.fullName} has been deleted.`,
    type: "User",
    priority: "High",
  });

};

// =========================
// Get User By ID
// =========================
const getUserByIdService = async (id) => {

  const user = await User.findById(id)
    .select("-password");

  if (!user) {

    const error = new Error("User not found");
    error.status = 404;
    throw error;

  }

  return user;

};

// =========================
// Verify KYC
// =========================
const verifyKycService = async (id) => {

  const user = await User.findById(id);

  if (!user) {

    const error = new Error("User not found");
    error.status = 404;
    throw error;

  }

  user.kycStatus = "Verified";

  await user.save();

  await createAdminNotificationService({
    title: "KYC Verified",
    message: `${user.fullName} KYC has been verified.`,
    type: "KYC",
    priority: "High",
  });

  return user;

};

// =========================
// Reject KYC
// =========================
const rejectKycService = async (id) => {

  const user = await User.findById(id);

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  user.kycStatus = "Rejected";

  await user.save();
  await createAdminNotificationService({
    title: "KYC Rejected",
    message: `${user.fullName} KYC has been rejected.`,
    type: "KYC",
    priority: "High",
  });

  return user;

};

// =========================
// Get All Transactions
// =========================
const getAllTransactionsService = async (query) => {

  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;

  const skip = (page - 1) * limit;

  const search = query.search || "";

  const type = query.type || "";

  const filter = {};

  if (type) {
    filter.type = type;
  }

  const transactions = await Transaction.find(filter)
    .populate(
      "sender",
      "fullName email accountNumber "
    )
    .populate(
      "receiver",
      "fullName email accountNumber "
    )
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

    const filteredTransactions = transactions.filter(
      (transaction) => {
    
        if (!search) return true;
    
        const keyword = search.toLowerCase();
    
        return (
    
          transaction.sender?.fullName
            ?.toLowerCase()
            .includes(keyword) ||
    
          transaction.sender?.email
            ?.toLowerCase()
            .includes(keyword) ||
    
          transaction.sender?.accountNumber
            ?.includes(search) ||
    
          transaction.receiver?.fullName
            ?.toLowerCase()
            .includes(keyword) ||
    
          transaction.receiver?.email
            ?.toLowerCase()
            .includes(keyword) ||
    
          transaction.receiver?.accountNumber
            ?.includes(search)
    
        );
    
      }
    );

  const totalTransactions =
    await Transaction.countDocuments(filter);

  return {

    transactions: filteredTransactions,

    totalTransactions,

    currentPage: page,

    totalPages: Math.ceil(
      totalTransactions / limit
    ),

  };

};

// =========================
// Reports
// =========================
const getReportsService = async () => {

  const totalDeposits = await Transaction.aggregate([
    {
      $match: {
        type: "Deposit",
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$amount",
        },
      },
    },
  ]);

  const totalWithdrawals = await Transaction.aggregate([
    {
      $match: {
        type: "Withdraw",
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$amount",
        },
      },
    },
  ]);

  const totalTransfers = await Transaction.aggregate([
    {
      $match: {
        type: "Transfer",
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$amount",
        },
      },
    },
  ]);

  const totalTransactions =
    await Transaction.countDocuments();

  const monthlyReport =
    await Transaction.aggregate([
      {
        $group: {
          _id: {
            month: {
              $month: "$createdAt",
            },
          },

          deposit: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    "$type",
                    "Deposit",
                  ],
                },
                "$amount",
                0,
              ],
            },
          },

          withdrawal: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    "$type",
                    "Withdraw",
                  ],
                },
                "$amount",
                0,
              ],
            },
          },

          transfer: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    "$type",
                    "Transfer",
                  ],
                },
                "$amount",
                0,
              ],
            },
          },

        },
      },

      {
        $sort: {
          "_id.month": 1,
        },
      },

    ]);

  return {

    totalDeposits:
      totalDeposits[0]?.total || 0,

    totalWithdrawals:
      totalWithdrawals[0]?.total || 0,

    totalTransfers:
      totalTransfers[0]?.total || 0,

    totalTransactions,

    monthlyReport,

  };

};
// =========================
// Export PDF Report
// =========================
const exportPdfReportService = async () => {

  const transactions = await Transaction.find()
    .populate(
      "sender",
      "fullName accountNumber"
    )
    .populate(
      "receiver",
      "fullName accountNumber"
    )
    .sort({ createdAt: -1 });

  return transactions;

};

const exportExcelReportService = async () => {

  const transactions = await Transaction.find()
    .populate("sender", "fullName accountNumber")
    .populate("receiver", "fullName accountNumber")
    .sort({ createdAt: -1 });

  return transactions;

};

// =========================
// Get Admin Profile
// =========================
const getAdminProfileService = async (adminId) => {

  const admin = await User.findById(adminId)
    .select("-password");

  if (!admin) {

    const error = new Error("Admin not found");
    error.status = 404;
    throw error;

  }

  return admin;

};

// =========================
// Update Admin Profile
// =========================
const updateAdminProfileService = async (
  adminId,
  body
) => {

  const admin = await User.findById(adminId);

  if (!admin) {

    const error = new Error("Admin not found");
    error.status = 404;
    throw error;

  }

  admin.fullName =
    body.fullName ?? admin.fullName;

  admin.email =
    body.email ?? admin.email;

  admin.phoneNumber =
    body.phoneNumber ??
    admin.phoneNumber;

  await admin.save();

  return admin;

};

// =========================
// Get Admin Notifications
// =========================
const getAdminNotificationsService = async () => {

  const notifications =
    await AdminNotification.find()
      .sort({ createdAt: -1 })
      .limit(20);

  const unreadCount =
    await AdminNotification.countDocuments({
      isRead: false,
    });

  return {

    notifications,

    unreadCount,

  };

};

// =========================
// Mark Notification As Read
// =========================
const markAdminNotificationReadService =
async (id) => {

  const notification =
    await AdminNotification.findById(id);

  if (!notification) {

    const error =
      new Error("Notification not found");

    error.status = 404;

    throw error;

  }

  notification.isRead = true;

  await notification.save();

  return notification;

};

// =========================
// Create Notification
// =========================
const createAdminNotificationService =
async ({
  title,
  message,
  type,
  priority = "Medium",
  metadata = {},
}) => {

  return await AdminNotification.create({

    title,

    message,

    type,

    priority,

    metadata,

  });

};

// =========================
// Mark All Notifications Read
// =========================
const markAllAdminNotificationsReadService =
async () => {

  await AdminNotification.updateMany(
    {
      isRead: false,
    },
    {
      isRead: true,
    }
  );

};

// =========================
// Delete Notification
// =========================
const deleteAdminNotificationService =
async (id) => {

  const notification =
    await AdminNotification.findById(id);

  if (!notification) {

    const error =
      new Error("Notification not found");

    error.status = 404;

    throw error;

  }

  await AdminNotification.findByIdAndDelete(id);

};

module.exports = {
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
  createAdminNotificationService,
  markAllAdminNotificationsReadService,
  deleteAdminNotificationService,
};