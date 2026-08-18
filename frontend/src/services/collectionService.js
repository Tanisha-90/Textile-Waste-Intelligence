import api from "../api/api";

export const addCollection = async (data) => {
  return await api.post("/collection-management/add", data);
};

export const getCollections = async () => {
  return await api.get("/collection-management/all");
};

export const deleteCollection = async (id) => {
  return await api.delete(`/collection-management/delete/${id}`);
};