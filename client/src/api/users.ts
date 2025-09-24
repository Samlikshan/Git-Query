import axios from "axios";
import type { User } from "../types";
import type { Repository } from "../types/index";

const API_BASE_URL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:5000/api";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
const api = axios.create({
  baseURL: `${API_BASE_URL}/users`,
  headers: { "Content-Type": "application/json" },
});

interface SearchUserResponse {
  user: User;
  repos: Repository[];
}
interface MutualFriendsResponse {
  friends: User[];
}

export async function searchUser(
  username: string,
): Promise<ApiResponse<SearchUserResponse>> {
  try {
    const res = await api.post(`/${username}`);

    return {
      success: true,
      data: { user: res.data.user, repos: res.data.repos },
    };
  } catch (error) {
    console.error("Search user error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export async function getMutualFriends(
  username: string,
  forceRefresh: boolean = false,
): Promise<ApiResponse<MutualFriendsResponse[]>> {
  try {
    const res = await api.post(`/${username}/mutual`, {
      forceRefresh: forceRefresh,
    });
    return { success: true, data: res.data.friends };
  } catch (error) {
    console.error("Get mutual friends error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export async function getUsers(params?: {
  username?: string;
  location?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
}): Promise<ApiResponse<{ users: User[]; pagination: any }>> {
  try {
    const res = await api.get("/", { params });
    console.log(res.data);
    return { success: true, data: res.data };
  } catch (error) {
    console.error("Get users error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export async function updateUser(
  username: string,
  userData: { bio?: string; blog?: string; location?: string },
): Promise<ApiResponse<User>> {
  try {
    const res = await api.patch(`/${username}`, userData);
    console.log(res.data);
    return { success: true, data: res.data };
  } catch (error) {
    console.error("Update user error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export async function deleteUser(username: string): Promise<ApiResponse<void>> {
  try {
    await api.delete(`/${username}`);
    return { success: true };
  } catch (error) {
    console.error("Delete user error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
