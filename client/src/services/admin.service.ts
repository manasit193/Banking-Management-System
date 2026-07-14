import api from "@/lib/axios";

// =========================
// Dashboard
// =========================
export const getDashboard = async () => {

  const response = await api.get(
    "/admin/dashboard"
  );

  return response.data;

};

// =========================
// Get All Users
// =========================
export const getAllUsers = async (
  page = 1,
  limit = 10,
  search = "",
  sort = "createdAt"
) => {

  const response = await api.get(
    "/admin/users",
    {
      params: {
        page,
        limit,
        search,
        sort,
      },
    }
  );

  return response.data;

};

// =========================
// Block / Unblock User
// =========================
export const blockUser = async (
  id: string
) => {

  const response = await api.put(
    `/admin/block/${id}`
  );

  return response.data;

};

// =========================
// Delete User
// =========================
export const deleteUser = async (
  id: string
) => {

  const response = await api.delete(
    `/admin/delete/${id}`
  );

  return response.data;

};

// =========================
// Get User By ID
// =========================
export const getUserById = async (
  id: string
) => {

  const response = await api.get(
    `/admin/user/${id}`
  );

  return response.data;

};

// =========================
// Verify KYC
// =========================
export const verifyKyc = async (
  id: string
) => {

  const response = await api.put(
    `/admin/verify-kyc/${id}`
  );

  return response.data;

};

// =========================
// Reject KYC
// =========================
export const rejectKyc = async (
  id: string
) => {

  const response = await api.put(
    `/admin/reject-kyc/${id}`
  );

  return response.data;

};

// =========================
// Get All Transactions
// =========================
export const getAllTransactions =
async (
  page = 1,
  limit = 10,
  search = "",
  type = ""
) => {

  const response = await api.get(
    "/admin/transactions",
    {
      params: {
        page,
        limit,
        search,
        type,
      },
    }
  );

  return response.data;

};

// =========================
// Reports
// =========================
export const getReports = async () => {

  const response = await api.get(
    "/admin/reports"
  );

  return response.data;

};

export const exportPdfReport =
async () => {

  const response =
    await api.get(
      "/admin/reports/pdf",
      {
        responseType: "blob",
      }
    );

  return response.data;

};

// =========================
// Export Excel
// =========================
export const exportExcelReport =
async () => {

  const response =
    await api.get(
      "/admin/reports/excel",
      {
        responseType: "blob",
      }
    );

  return response.data;

};

// =========================
// Get Admin Profile
// =========================
export const getAdminProfile = async () => {

  const response = await api.get(
    "/admin/profile"
  );

  return response.data;

};

// =========================
// Update Admin Profile
// =========================
export const updateAdminProfile = async (
  data: {
    fullName: string;
    email: string;
    phoneNumber: string;
  }
) => {

  const response = await api.put(
    "/admin/profile",
    data
  );

  return response.data;

};

// =========================
// Get Admin Notifications
// =========================
export const getAdminNotifications =
async () => {

  const response =
    await api.get(
      "/admin/notifications"
    );

  return response.data;

};

// =========================
// Mark Notification Read
// =========================
export const markAdminNotificationRead =
async (id: string) => {

  const response =
    await api.put(
      `/admin/notifications/${id}/read`
    );

  return response.data;

};

// =========================
// Mark All Notifications Read
// =========================
export const markAllAdminNotificationsRead =
async () => {

  const response = await api.put(
    "/admin/notifications/read-all"
  );

  return response.data;

};

// =========================
// Delete Notification
// =========================
export const deleteAdminNotification =
async (id: string) => {

  const response = await api.delete(
    `/admin/notifications/${id}`
  );

  return response.data;

};