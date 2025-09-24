import { injectable } from "inversify";
import axiosClient from "../../config/axios.client";
import GitHubUser from "../../domain/entities/GithubUser";

@injectable()
export class GithubService {
  async fetchUser(username: string): Promise<GitHubUser> {
    const res = await axiosClient.get(`/users/${username}`);
    return res.data;
  }
  async fetchUserConnections(
    username: string,
    type: "followers" | "following",
  ): Promise<GitHubUser[]> {
    const res = await axiosClient.get(`/users/${username}/${type}`);
    return res.data;
  }
}
