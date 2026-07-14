import api from "@/lib/axios";

// =========================
// Deposit
// =========================
export const depositMoney = async (
  amount: number
) => {
  const response = await api.post(
    "/transaction/deposit",
    {
      amount,
    }
  );

  return response.data;
};

// =========================
// Withdraw
// =========================
export const withdrawMoney = async (
  amount: number
) => {
  const response = await api.post(
    "/transaction/withdraw",
    {
      amount,
    }
  );

  return response.data;
};

// =========================
// Check Balance
// =========================
export const getBalance = async () => {
  const response = await api.get("/transaction/balance");

  return response.data;
};

// =========================
// Verify Receiver
// =========================
export const verifyReceiver = async (
  accountNumber: string
) => {
  const response = await api.get(
    `/transaction/verify-account/${accountNumber}`
  );

  return response.data;
};

// =========================
// Transfer Money
// =========================

export const transferMoney = async (
  accountNumber: string,
  amount: number
) => {

  const response = await api.post(
    "/transaction/transfer",
    {
      accountNumber,
      amount,
    }
  );

  return response.data;

};

// =========================
// Get Transaction History
// =========================
export const getTransactionHistory = async () => {
  const response = await api.get("/transaction/history");
  return response.data;
};

