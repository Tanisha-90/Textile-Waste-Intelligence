import api from "../api/api";

// Register User
export const registerUser = async (userData) => {
  return await api.post("/auth/register", userData);
};

// Login User
export const loginUser = async (loginData) => {
  return await api.post("/auth/login", loginData);
};