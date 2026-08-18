import api from "../api/api";

export const addWasteRegistration = async (formData) => {
  return await api.post("/waste-registration/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getWasteRegistrations = async () => {
  return await api.get("/waste-registration/all");
};

export const deleteWasteRegistration = async (id) => {
  return await api.delete(`/waste-registration/delete/${id}`);
};
