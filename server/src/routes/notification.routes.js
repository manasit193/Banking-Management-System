const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} = require("../controllers/notification.controller");

// =========================
// Get All Notifications
// =========================
router.get(
  "/",
  authMiddleware,
  getNotifications
);

// =========================
// Mark Notification As Read
// =========================
router.patch(
  "/:id",
  authMiddleware,
  markAsRead
);

// =========================
// Mark All Notifications As Read
// =========================
router.patch(
  "/read-all",
  authMiddleware,
  markAllAsRead
);

// =========================
// Delete Notification
// =========================
router.delete(
  "/:id",
  authMiddleware,
  deleteNotification
);

module.exports = router;