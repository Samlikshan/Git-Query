import axios from "axios";

const BASE_URL = process.env.BASE_URL || "https://api.github.com";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "User-Agent": "git-query",
  },
  timeout: 5000,
});

export default axiosClient;
