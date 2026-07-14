import api from "@/lib/axios";

type LoginData = {
  email: string;
  password: string;
};

export const login = async (data: LoginData) => {
  const response = await api.post("/auth/login", data);

  return response.data;
};

export const forgotPassword = async (
  email: string
) => {

  const response = await api.post(
    "/auth/forgot-password",
    {
      email,
    }
  );

  return response.data;

};

export const verifyOTP = async (
  email: string,
  otp: string
) => {

  const response = await api.post(
    "/auth/verify-otp",
    {
      email,
      otp,
    }
  );

  return response.data;

};

export const resetPassword = async (
  email: string,
  otp: string,
  newPassword: string
) => {

  const response = await api.post(
    "/auth/reset-password",
    {
      email,
      otp,
      newPassword,
    }
  );

  return response.data;

};

type RegisterData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  fathersName: string;
  address: string;
  accountType: string;
  kycDocumentNumber: string;
  password: string;
  kycDocument: File | null;
};

export const register = async (
  data: RegisterData
) => {

  const formData = new FormData();

  formData.append("fullName", data.fullName);
  formData.append("email", data.email);
  formData.append("phoneNumber", data.phoneNumber);
  formData.append("dateOfBirth", data.dateOfBirth);
  formData.append("fathersName", data.fathersName);
  formData.append("address", data.address);
  formData.append("accountType", data.accountType);
  formData.append("kycDocumentNumber", data.kycDocumentNumber);
  formData.append("password", data.password);

  if (data.kycDocument) {

    formData.append(
      "kycDocument",
      data.kycDocument
    );

  }

  const response = await api.post(
    "/auth/register",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;

};

export const getProfile = async () => {
  const response = await api.get("/auth/profile");

  return response.data;
};


export const verifyPassword = async (
  password: string
) => {

  const response = await api.post(
    "/auth/verify-password",
    {
      password,
    }
  );

  return response.data;
};