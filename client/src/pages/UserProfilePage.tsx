import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { searchUser } from "../api/users";
import UserProfile from "../components/UserProfile";
import RepositoryGrid from "../components/RepositoryGrid";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import type { AppView } from "../App";
import "../styles/UserProfilePage.css";
import type { Repository, User } from "../types";

interface UserProfilePageProps {
  user: User;
  navigate: (view: AppView, data?: { repo?: Repository; user?: User }) => void;
  setIsLoading: (loading: boolean) => void;
}

function UserProfilePage({
  user,
  navigate,
  setIsLoading,
}: UserProfilePageProps) {
  const { state, dispatch } = useAppContext();
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [error, setError] = useState<string>("");

  const currentUser = user;

  useEffect(() => {
    const loadUserAndRepos = async () => {
      if (!currentUser?.login) {
        setError("No user selected");
        return;
      }

      // Check cache first
      const cacheKey = `user_${currentUser.login}`;
      if (state.cache[cacheKey]) {
        setRepositories(state.cache[cacheKey].repositories || []);
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const response = await searchUser(currentUser.login);
        if (!response.success || !response.data) {
          throw new Error(response.error || "Failed to load user data");
        }

        const searchResults = {
          user: response.data.user,
          repositories: response.data.repos || [],
        };

        setRepositories(searchResults.repositories);

        // Cache the results
        dispatch({
          type: "SET_CACHE",
          payload: { key: cacheKey, data: searchResults },
        });

        // Update global searchResults too (so going back to home is consistent)
        dispatch({
          type: "SET_SEARCH_RESULTS",
          payload: searchResults,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };

    loadUserAndRepos();
  }, [currentUser, state.cache, dispatch, setIsLoading]);

  const handleRepoClick = (repo: Repository) => {
    navigate("repo-details", { repo });
  };

  return (
    <div className="user-profile-page">
      <div className="back-button-container">
        <Button onClick={() => navigate("home")} variant="secondary">
          ← Back to Search
        </Button>
      </div>

      <div className="profile-layout">
        <div className="profile-sidebar">
          <UserProfile user={currentUser} />
        </div>

        <div className="repositories-section">
          <div className="section-header">
            <h2>Repositories</h2>
            <span className="repo-count">
              {repositories.length} repositories
            </span>
          </div>

          {error && <ErrorMessage message={error} />}

          {repositories.length > 0 ? (
            <RepositoryGrid
              repositories={repositories}
              onRepoClick={handleRepoClick}
            />
          ) : (
            !error && (
              <div className="no-repos">
                <p>No repositories found for this user.</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
