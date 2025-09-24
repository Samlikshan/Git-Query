import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { searchUser } from "../api/users";
import UserProfile from "../components/UserProfile";
import RepositoryGrid from "../components/RepositoryGrid";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import type { AppView } from "../App";
import "../styles/HomePage.css";
import type { Repository, User } from "../types";

interface HomePageProps {
  navigate: (view: AppView, data?: { repo?: Repository; user?: User }) => void;
  setIsLoading: (loading: boolean) => void;
}

function HomePage({ navigate, setIsLoading }: HomePageProps) {
  const { state, dispatch } = useAppContext();
  const [error, setError] = useState<string>("");
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    const handleHeaderSearch = (event: CustomEvent) => {
      const username = event.detail;
      handleSearch(username);
    };

    window.addEventListener(
      "headerSearch",
      handleHeaderSearch as EventListener,
    );
    return () => {
      window.removeEventListener(
        "headerSearch",
        handleHeaderSearch as EventListener,
      );
    };
  }, []);

  const handleSearch = async (username: string) => {
    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }

    // Check cache first
    const cacheKey = `user_${username}`;
    if (state.cache[cacheKey]) {
      dispatch({
        type: "SET_SEARCH_RESULTS",
        payload: state.cache[cacheKey],
      });
      setSearchPerformed(true);
      setError("");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Search for user
      const response = await searchUser(username);
      if (!response.success) {
        throw new Error(response.error);
      }

      const searchResults = {
        user: response.data?.user,
        repositories: response.data?.repos || [],
      };

      // Cache the results
      dispatch({
        type: "SET_CACHE",
        payload: { key: cacheKey, data: searchResults },
      });

      dispatch({
        type: "SET_SEARCH_RESULTS",
        payload: searchResults,
      });

      setSearchPerformed(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRepoClick = (repo: any) => {
    navigate("repo-details", { repo });
  };

  const handleVisitProfile = () => {
    if (state.searchResults.user) {
      navigate("user-profile", { user: state.searchResults.user });
    }
  };

  return (
    <div className="home-page">
      {error && <ErrorMessage message={error} />}

      {state.searchResults.user && (
        <div className="results-layout">
          <div className="profile-sidebar">
            <div className="profile-card-container">
              <UserProfile user={state.searchResults.user} />
              <div className="profile-actions">
                <Button onClick={handleVisitProfile} variant="primary">
                  Visit Profile
                </Button>
              </div>
            </div>
          </div>

          <div className="repositories-main">
            <div className="repositories-section">
              <div className="section-header">
                <h2>Repositories</h2>
                <span className="repo-count">
                  {state.searchResults.repositories.length} repositories
                </span>
              </div>

              {state.searchResults.repositories.length > 0 ? (
                <RepositoryGrid
                  repositories={state.searchResults.repositories}
                  onRepoClick={handleRepoClick}
                />
              ) : (
                <div className="no-repos">
                  <p>No repositories found for this user.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {searchPerformed && !state.searchResults.user && !error && (
        <div className="no-results">
          <h3>No User Found</h3>
          <p>Try searching for a different username.</p>
        </div>
      )}

      {!searchPerformed && (
        <div className="welcome-section">
          <h1>GitHub User Explorer</h1>
          <p>
            Use the search bar in the header to find GitHub users and explore
            their repositories
          </p>
        </div>
      )}
    </div>
  );
}

export default HomePage;
