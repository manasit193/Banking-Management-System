import api from "@/lib/axios";

export const uploadKYC = async (
  file: File
) => {

  const formData = new FormData();

  formData.append("kycDocument", file);

  const response = await api.post(
    "/auth/upload-kyc",
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