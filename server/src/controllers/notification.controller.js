const asyncHandler = require("../utils/asyncHandler");

const {
  getNotificationsService,
  markAsReadService,
  markAllAsReadService,
  deleteNotificationService,
} = require("../services/notification.service");

// =========================
// Get Notifications
// =========================
const getNotifications = asyncHandler(async (req, res) => {

  const notifications =
    await getNotificationsService(req.user.id);

  res.status(200).json({
    success: true,
    total: notifications.length,
    data: notifications,
  });

});

// =========================
// Mark As Read
// =========================
const markAsRead = asyncHandler(async (req, res) => {

  const notification =
    await markAsReadService(
      req.params.id,
      req.user.id
    );

  res.status(200).json({
    success: true,
    message: "Notification marked as read",
    data: notification,
  });

});

// =========================
// Mark All As Read
// =========================
const markAllAsRead = asyncHandler(async (req, res) => {

  await markAllAsReadService(req.user.id);

  res.status(200).json({
    success: true,
    message: "All notifications marked as read",
  });

});

// =========================
// Delete Notification
// =========================
const deleteNotification = asyncHandler(async (req, res) => {

  await deleteNotificationService(
    req.params.id,
    req.user.id
  );

  res.status(200).json({
    success: true,
    message: "Notification deleted successfully",
  });

});

module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};