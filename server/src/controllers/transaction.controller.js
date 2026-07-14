const mongoose = require("mongoose");
const asyncHandler = require("../utils/asyncHandler");
const { depositService, withdrawService, transferService , checkBalanceService, transactionHistoryService, verifyReceiverService} = require("../services/transaction.service");
const User = require("../models/user.model");
const Transaction = require("../models/transaction.model");

// =========================
// Deposit Money
// =========================
const depositMoney = asyncHandler(async (req, res) => {
  const { amount } = req.body;

  const balance = await depositService(req.user.id, amount);

  res.status(200).json({
    success: true,
    message: "Money Deposited Successfully",
    balance,
  });
});

// =========================
// Withdraw Money
// =========================
const withdrawMoney = asyncHandler(async (req, res) => {
  const { amount } = req.body;

  const balance = await withdrawService(req.user.id, amount);

  res.status(200).json({
    success: true,
    message: "Money Withdrawn Successfully",
    balance,
  });
});

// =========================
// Transfer Money
// =========================
const transferMoney = asyncHandler(async (req, res) => {

  const { accountNumber, amount } = req.body;

  const result = await transferService(
    req.user.id,
    accountNumber,
    amount
  );

  res.status(200).json(result);

});
// =========================
// Check Balance
// =========================
const checkBalance = asyncHandler(async (req, res) => {
  const user = await checkBalanceService(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});
// =========================
// Transaction History
// =========================
const transactionHistory = asyncHandler(async (req, res) => {
  const result = await transactionHistoryService(req.user.id);

  res.status(200).json({
    success: true,
    total: result.total,
    data: result.transactions,
  });
});

const verifyReceiver = asyncHandler(async (req, res) => {
  const { accountNumber } = req.params;

  const receiver =
    await verifyReceiverService(accountNumber);

  res.status(200).json({
    success: true,
    data: receiver,
  });
});

module.exports = {
  depositMoney,
  withdrawMoney,
  transferMoney,
  checkBalance,
  transactionHistory,
  verifyReceiver,
};