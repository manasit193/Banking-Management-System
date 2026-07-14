const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const {depositMoney, withdrawMoney, transferMoney, checkBalance, transactionHistory,
    verifyReceiver
} = require("../controllers/transaction.controller");

router.post("/deposit", authMiddleware, depositMoney);
router.post("/withdraw", authMiddleware, withdrawMoney);
router.post("/transfer", authMiddleware, transferMoney);
router.get("/balance", authMiddleware, checkBalance);
router.get("/history", authMiddleware, transactionHistory);
router.get("/verify-account/:accountNumber",authMiddleware,verifyReceiver);
module.exports = router;