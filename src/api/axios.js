import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // 🔥 REQUIRED FOR COOKIE AUTH
});

export default api;
