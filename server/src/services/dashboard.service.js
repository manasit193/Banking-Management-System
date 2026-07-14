const User = require("../models/user.model");
const Transaction = require("../models/transaction.model");

const getDashboardService = async (userId) => {

  // User Details
  const user = await User.findById(userId)
    .select("-password");

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  // User Transactions
  const transactions = await Transaction.find({
    $or: [
      { sender: userId },
      { receiver: userId },
    ],
  })
    .populate("sender", "fullName accountNumber")
    .populate("receiver", "fullName accountNumber")
    .sort({ createdAt: -1 });

  // Statistics
  const totalDeposit = transactions
    .filter((item) => item.type === "Deposit")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalWithdraw = transactions
    .filter((item) => item.type === "Withdraw")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalTransfer = transactions
    .filter((item) => item.type === "Transfer")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalTransactions = transactions.length;

  // Latest 5 Transactions
  const recentTransactions =
    transactions.slice(0, 5);

  return {

    user,

    stats: {
      totalTransactions,
      totalDeposit,
      totalWithdraw,
      totalTransfer,
    },

    recentTransactions,

  };

};

module.exports = {
  getDashboardService,
};