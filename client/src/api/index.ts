import axios from "axios";
import type { User, Repo } from "../types/types";

const BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const api = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const msg =
      err.response?.data?.message ||
      err.response?.statusText ||
      err.message ||
      "Unknown error";
    return Promise.reject(new Error(msg));
  },
);

export async function fetchUser(
  username: string,
): Promise<{ user: User; repos: Repo[] }> {
  return api.get(`/api/users/${encodeURIComponent(username)}`);
}

export async function fetchUserRepos(username: string): Promise<Repo[]> {
  return api.get(`/api/users/${encodeURIComponent(username)}/repos`);
}

export async function fetchMutualFriends(username: string): Promise<User[]> {
  return api.post(`/api/users/${encodeURIComponent(username)}/friends`);
}

export async function listUsers(params?: {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
}) {
  return api.get("/api/users", { params });
}

export async function softDeleteUser(username: string) {
  return api.delete(`/api/users/${encodeURIComponent(username)}`);
}

export async function updateUser(username: string, payload: Partial<User>) {
  return api.patch(`/api/users/${encodeURIComponent(username)}`, payload);
}
