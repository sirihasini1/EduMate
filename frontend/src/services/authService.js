import axios from "axios";

const API = "http://127.0.0.1:8000";

export const registerUser = async (data) => {
  return axios.post(`${API}/register`, data);
};

export const loginUser = async (data) => {
  return axios.post(`${API}/login`, data);
};