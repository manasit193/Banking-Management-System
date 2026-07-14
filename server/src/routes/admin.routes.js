const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

const {
    getAllUsers,getDashboard,blockUser,
    deleteUser,getUserById,verifyKyc,
    rejectKyc,getAllTransactions,getReports,
    exportPdfReport,exportExcelReport,getAdminProfile,
    updateAdminProfile,getAdminNotifications,markAdminNotificationRead,
    markAllAdminNotificationsRead,deleteAdminNotification
     } = require("../controllers/admin.controller");

router.get("/dashboard",authMiddleware,adminMiddleware,getDashboard);

router.get("/users",authMiddleware,adminMiddleware,getAllUsers);

router.put("/block/:id", authMiddleware, adminMiddleware, blockUser);

router.delete("/delete/:id",authMiddleware,adminMiddleware,deleteUser);

router.get("/user/:id",authMiddleware,adminMiddleware,getUserById);

router.put("/verify-kyc/:id",authMiddleware,adminMiddleware,verifyKyc);

router.put("/reject-kyc/:id",authMiddleware,adminMiddleware,rejectKyc);

router.get("/transactions",authMiddleware,adminMiddleware,getAllTransactions);
router.get( "/reports", authMiddleware,adminMiddleware,getReports);
router.get("/reports/pdf",authMiddleware,adminMiddleware,exportPdfReport);
router.get("/reports/excel",authMiddleware,adminMiddleware,exportExcelReport);
router.get("/profile",authMiddleware,adminMiddleware,getAdminProfile);
router.put("/profile",authMiddleware,adminMiddleware,updateAdminProfile);
router.get("/notifications",authMiddleware,adminMiddleware,getAdminNotifications);
router.put("/notifications/read-all",authMiddleware,adminMiddleware,markAllAdminNotificationsRead);
router.put("/notifications/:id",authMiddleware,adminMiddleware,markAdminNotificationRead);
router.delete("/notifications/:id",authMiddleware,adminMiddleware,deleteAdminNotification);
module.exports = router;