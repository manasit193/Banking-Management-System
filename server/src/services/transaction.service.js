const mongoose = require("mongoose");

const User = require("../models/user.model");
const Transaction = require("../models/transaction.model");
const {createNotificationService} = require("./notification.service");

const depositService = async (userId, amount) => {
  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  user.balance += Number(amount);

  await user.save();

  await Transaction.create({
    receiver: user._id,
    amount,
    type: "Deposit",
  });
  
  await createNotificationService({
    user: user._id,
    title: "Deposit Successful",
    message: `₹${Number(amount).toLocaleString()} has been deposited into your account successfully.`,
    type: "Deposit",
  });
  return user.balance;
};

const withdrawService = async (userId, amount) => {
    const user = await User.findById(userId);
  
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
  
    if (user.balance < amount) {
      const error = new Error("Insufficient Balance");
      error.status = 400;
      throw error;
    }
  
    user.balance -= Number(amount);
  
    await user.save();
  
    await Transaction.create({
      sender: user._id,
      amount,
      type: "Withdraw",
    });

    await createNotificationService({
      user: user._id,
      title: "Withdrawal Successful",
      message: `₹${Number(amount).toLocaleString()} has been withdrawn from your account successfully.`,
      type: "Withdraw",
    });
  
    return user.balance;
  };

  const transferService = async (senderId, accountNumber, amount) => {
    const session = await mongoose.startSession();
  
    try {
      session.startTransaction();
  
      const sender = await User.findById(senderId).session(session);
  
      if (!sender) {
        const error = new Error("Sender not found");
        error.status = 404;
        throw error;
      }
  
      const receiver = await User.findOne({
        accountNumber,
      }).session(session);
  
      if (!receiver) {
        const error = new Error("Receiver Account Not Found");
        error.status = 404;
        throw error;
      }
  
      if (sender.accountNumber === receiver.accountNumber) {
        const error = new Error(
          "You cannot transfer money to your own account"
        );
        error.status = 400;
        throw error;
      }
  
      if (sender.balance < amount) {
        const error = new Error("Insufficient Balance");
        error.status = 400;
        throw error;
      }
  
      sender.balance -= Number(amount);
      receiver.balance += Number(amount);
  
      await sender.save({ session });
      await receiver.save({ session });
  
      await Transaction.create(
        [
          {
            sender: sender._id,
            receiver: receiver._id,
            amount,
            type: "Transfer",
          },
        ],
        { session }
      );
      

      await createNotificationService({
        user: sender._id,
        title: "Transfer Successful",
        message: `₹${Number(amount).toLocaleString()} has been transferred to ${receiver.fullName}.`,
        type: "Transfer",
        session,
      });

      await createNotificationService({
        user: receiver._id,
        title: "Money Received",
        message: `₹${Number(amount).toLocaleString()} has been received from ${sender.fullName}.`,
        type: "Transfer",
        session,
      });
      await session.commitTransaction();
  
      return {
        success: true,
        message: "Money Transferred Successfully",
      };
  
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  };

  const checkBalanceService = async (userId) => {
    const user = await User.findById(userId).select(
      "fullName accountNumber accountType balance"
    );
  
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
  
    return user;
  };

  const transactionHistoryService = async (userId) => {
    const transactions = await Transaction.find({
      $or: [
        { sender: userId },
        { receiver: userId },
      ],
    })
      .populate("sender", "fullName accountNumber")
      .populate("receiver", "fullName accountNumber")
      .sort({ createdAt: -1 });
  
    return {
      total: transactions.length,
      transactions,
    };
  };

const verifyReceiverService = async (
  accountNumber
) => {

  const receiver = await User.findOne({
    accountNumber,
  }).select(
    "fullName accountNumber accountType profileImage isVerified"
  );

  if (!receiver) {
    const error = new Error(
      "Account not found"
    );

    error.status = 404;

    throw error;
  }

  return receiver;
};
module.exports = {
  depositService,
  withdrawService,
  transferService,
  checkBalanceService,
  transactionHistoryService,
  verifyReceiverService,
};