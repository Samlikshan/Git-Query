import React, { createContext, useContext, useReducer } from "react";
import type { ReactNode } from "react";

interface User {
  id: string;
  login: string;
  name?: string;
  email?: string;
  bio?: string;
  blog?: string;
  location?: string;
  avatarUrl: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  createdAt: string;
}

interface Repository {
  id: string;
  name: string;
  full_name: string;
  description?: string;
  html_url: string;
  language?: string;
  stargazers_count: number;
  forks_count: number;
  createdAt: string;
  updatedAt: string;
}

interface AppState {
  searchResults: {
    user?: User;
    repositories: Repository[];
  };
  mutualFriends: User[];
  allUsers: User[];
  cache: {
    [key: string]: any;
  };
}

type AppAction =
  | {
      type: "SET_SEARCH_RESULTS";
      payload: { user?: User; repositories: Repository[] };
    }
  | { type: "SET_MUTUAL_FRIENDS"; payload: User[] }
  | { type: "SET_ALL_USERS"; payload: User[] }
  | { type: "UPDATE_USER"; payload: User }
  | { type: "DELETE_USER"; payload: string }
  | { type: "SET_CACHE"; payload: { key: string; data: any } }
  | { type: "CLEAR_CACHE" };

const initialState: AppState = {
  searchResults: {
    repositories: [],
  },
  mutualFriends: [],
  allUsers: [],
  cache: {},
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.payload,
      };
    case "SET_MUTUAL_FRIENDS":
      return {
        ...state,
        mutualFriends: action.payload,
      };
    case "SET_ALL_USERS":
      return {
        ...state,
        allUsers: action.payload,
      };
    case "UPDATE_USER":
      return {
        ...state,
        allUsers: state.allUsers.map((user) =>
          user.id === action.payload.id ? action.payload : user,
        ),
      };
    case "DELETE_USER":
      return {
        ...state,
        allUsers: state.allUsers.filter(
          (user) => user.login !== action.payload,
        ),
      };
    case "SET_CACHE":
      return {
        ...state,
        cache: {
          ...state.cache,
          [action.payload.key]: action.payload.data,
        },
      };
    case "CLEAR_CACHE":
      return {
        ...state,
        cache: {},
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}

export type { User, Repository };
