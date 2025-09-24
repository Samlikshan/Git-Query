import axios from "axios";

const BASE_URL = process.env.BASE_URL || "https://api.github.com";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
    "User-Agent": "git-query",
  },
  timeout: 5000,
});

export default axiosClient;
