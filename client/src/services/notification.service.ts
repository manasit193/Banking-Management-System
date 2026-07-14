import api from "@/lib/axios";

// =========================
// Get Notifications
// =========================
export const getNotifications = async () => {

  const response = await api.get(
    "/notification"
  );

  return response.data;

};

// =========================
// Mark As Read
// =========================
export const markAsRead = async (
  id: string
) => {

  const response = await api.patch(
    `/notification/${id}`
  );

  return response.data;

};

// =========================
// Mark All As Read
// =========================
export const markAllAsRead =
  async () => {

    const response =
      await api.patch(
        "/notification/read-all"
      );

    return response.data;

  };

// =========================
// Delete Notification
// =========================
export const deleteNotification =
  async (id: string) => {

    const response =
      await api.delete(
        `/notification/${id}`
      );

    return response.data;

  };