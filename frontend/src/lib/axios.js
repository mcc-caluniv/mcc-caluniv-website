import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "/api",
  withCredentials: true,
  maxContentLength: 2 * 1024 * 1024,
  maxBodyLength: 2 * 1024 * 1024,
});
