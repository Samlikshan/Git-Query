import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User, Repo } from "../types/types";

type UsersState = {
  users: Record<string, User>;
  repos: Record<string, Repo[]>;
};

const initialState: UsersState = {
  users: {},
  repos: {},
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      const u = action.payload;
      if (u?.username) {
        state.users[u.username.toLowerCase()] = u;
      }
    },
    setRepos: (
      state,
      action: PayloadAction<{ username: string; repos: Repo[] }>,
    ) => {
      const { username, repos } = action.payload;
      state.repos[username.toLowerCase()] = repos;
    },
    clearUser: (state, action: PayloadAction<string>) => {
      const key = action.payload.toLowerCase();
      delete state.users[key];
      delete state.repos[key];
    },
  },
});

export const { setUser, setRepos, clearUser } = userSlice.actions;
export default userSlice.reducer;
