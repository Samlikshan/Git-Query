import * as api from "../api";
import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setUser, setRepos } from "../store/userSlice";
import type { Repo, User } from "../types/types";

export function useFetchUser() {
  const users = useAppSelector((s) => s.users.users);
  const repos = useAppSelector((s) => s.users.repos);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(
    async (username: string): Promise<{ user: User; repos: Repo[] } | null> => {
      const key = username.toLowerCase();

      if (users[key] && repos[key]) {
        return { user: users[key], repos: repos[key] };
      }

      setLoading(true);
      setError(null);

      try {
        const res = await api.fetchUser(username);
        if (res?.user) dispatch(setUser(res.user));
        if (res?.repos) dispatch(setRepos({ username, repos: res.repos }));
        setLoading(false);
        return { user: res.user, repos: res.repos ?? [] };
      } catch (err: any) {
        setError(err?.message ?? "Failed to fetch user");
        setLoading(false);
        return null;
      }
    },
    [users, repos, dispatch],
  );

  return { fetchUser, loading, error };
}
