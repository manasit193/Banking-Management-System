const Notification = require("../models/notification.model");

// =========================
// Create Notification
// =========================
const createNotificationService = async ({
  user,
  title,
  message,
  type,
  session = null,
}) => {

  const notification = {
    user,
    title,
    message,
    type,
  };

  if (session) {
    await Notification.create(
      [notification],
      { session }
    );
  } else {
    await Notification.create(notification);
  }

};

 

// =========================
// Get All Notifications
// =========================
const getNotificationsService = async (
  userId
) => {

  return await Notification.find({
    user: userId,
  }).sort({
    createdAt: -1,
  });

};

// =========================
// Mark Notification As Read
// =========================
const markAsReadService = async (
  notificationId,
  userId
) => {

  const notification =
    await Notification.findOne({
      _id: notificationId,
      user: userId,
    });

  if (!notification) {

    const error = new Error(
      "Notification not found"
    );

    error.status = 404;

    throw error;

  }

  notification.isRead = true;

  await notification.save();

  return notification;

};

// =========================
// Mark All As Read
// =========================
const markAllAsReadService = async (
  userId
) => {

  await Notification.updateMany(
    {
      user: userId,
      isRead: false,
    },
    {
      isRead: true,
    }
  );

  return;

};

// =========================
// Delete Notification
// =========================
const deleteNotificationService = async (
  notificationId,
  userId
) => {

  const notification =
    await Notification.findOneAndDelete({
      _id: notificationId,
      user: userId,
    });

  if (!notification) {

    const error = new Error(
      "Notification not found"
    );

    error.status = 404;

    throw error;

  }

  return;

};

module.exports = {
  createNotificationService,
  getNotificationsService,
  markAsReadService,
  markAllAsReadService,
  deleteNotificationService,
};