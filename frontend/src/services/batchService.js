import api from "../api/api";

export const addBatch = async (data) => {
  return await api.post("/batch-management/add", data);
};

export const getBatches = async () => {
  return await api.get("/batch-management/all");
};

export const deleteBatch = async (id) => {
  return await api.delete(`/batch-management/delete/${id}`);
};