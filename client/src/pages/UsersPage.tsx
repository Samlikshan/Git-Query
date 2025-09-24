import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { getUsers, updateUser, deleteUser } from "../api/users";
import UserTable from "../components/UserTable";
import Pagination from "../components/Pagination";
import SortControls from "../components/SortControls";
import ErrorMessage from "../components/ErrorMessage";
import Button from "../components/Button";
import type { AppView } from "../App";
import "../styles/UserPage.css";

interface UsersPageProps {
  navigate: (view: AppView, data?: { user?: any }) => void;
  setIsLoading: (loading: boolean) => void;
}

function UsersPage({ navigate, setIsLoading }: UsersPageProps) {
  const { state, dispatch } = useAppContext();
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(false);
  const usersPerPage = 10;

  const loadUsers = async (params: any = {}) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await getUsers({
        page: params.page ?? currentPage,
        limit: usersPerPage,
        sortBy: params.sortBy ?? sortBy,
        order: params.order ?? sortOrder,
        username: params.username,
      });

      if (!response.success) throw new Error(response.error);

      dispatch({
        type: "SET_ALL_USERS",
        payload: response.data?.users || [],
      });

      setTotalUsers(response.data?.pagination?.total || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isSearchMode) {
      loadUsers();
    }
  }, [currentPage, sortBy, sortOrder, isSearchMode]);

  const handleSortChange = (
    newSortBy: string,
    newSortOrder: "asc" | "desc",
  ) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleUpdateUser = async (
    username: string,
    userData: { bio?: string; blog?: string; location?: string },
  ) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await updateUser(username, userData);
      if (!response.success) throw new Error(response.error);

      dispatch({
        type: "UPDATE_USER",
        payload: response.data?.user,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update user");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (username: string) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await deleteUser(username);
      if (!response.success) throw new Error(response.error);

      dispatch({
        type: "DELETE_USER",
        payload: username,
      });

      if (state.allUsers.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete user");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setIsSearchMode(false);
      setCurrentPage(1);
      loadUsers({ page: 1 });
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await getUsers({
        username: searchQuery.trim(),
        page: 1,
      });
      if (!response.success) throw new Error(response.error);

      dispatch({
        type: "SET_ALL_USERS",
        payload: response.data?.users || [],
      });

      setTotalUsers(response.data?.pagination?.total || 0);
      setIsSearchMode(true);
      setCurrentPage(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setIsSearchMode(false);
    setCurrentPage(1);
    loadUsers({ page: 1 });
  };

  const handleUserClick = (user: any) => {
    navigate("user-profile", { user });
  };

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  return (
    <div className="users-page">
      <div className="page-header">
        <h1>Users Database</h1>
        <p>Manage all users stored in the database</p>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="controls-section">
        <div className="controls-bar">
          <SortControls
            currentSort={sortBy}
            currentOrder={sortOrder}
            onSortChange={handleSortChange}
            disabled={isSearchMode}
          />

          <div className="search-bar-inline">
            <div className="search-input-container">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users by username..."
                className="search-input"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>

            <div className="search-actions">
              <Button onClick={handleSearch} disabled={!searchQuery.trim()}>
                Search
              </Button>
              {isSearchMode && (
                <Button variant="secondary" onClick={handleClearSearch}>
                  Clear
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {isSearchMode && (
        <div className="search-results-info">
          <p>
            Search results for "{searchQuery}" - {totalUsers} user(s) found
          </p>
        </div>
      )}

      <UserTable
        users={state.allUsers}
        onUpdateUser={handleUpdateUser}
        onDeleteUser={handleDeleteUser}
        onUserClick={handleUserClick}
      />

      {totalPages > 1 && !isSearchMode && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {state.allUsers.length === 0 && !error && (
        <div className="empty-state">
          <h3>{isSearchMode ? "No Search Results" : "No Users Found"}</h3>
          <p>
            {isSearchMode
              ? `No users found matching "${searchQuery}".`
              : "No users are currently stored in the database."}
          </p>
        </div>
      )}
    </div>
  );
}

export default UsersPage;
