import api from "@/lib/axios";

export const uploadProfileImage = async (
  file: File
) => {
  const formData = new FormData();

  formData.append("profileImage", file);

  const response = await api.post(
    "/auth/upload-profile",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};