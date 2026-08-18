import api from "../api/api";

export const addWasteSource = (data) =>
  api.post("/waste-source/add", data);

export const getWasteSources = () =>
  api.get("/waste-source/all");

export const deleteWasteSource = (id) =>
  api.delete(`/waste-source/delete/${id}`);