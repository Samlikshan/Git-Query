import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { getMutualFriends, searchUser } from "../api/users";
import UserCard from "../components/UserCard";
import ErrorMessage from "../components/ErrorMessage";
import type { AppView } from "../App";
import "../styles/MutualFriendsPage.css";

interface MutualFriendsPageProps {
  navigate: (view: AppView, data?: { user?: any }) => void;
  setIsLoading: (loading: boolean) => void;
}

function MutualFriendsPage({ navigate, setIsLoading }: MutualFriendsPageProps) {
  const { state, dispatch } = useAppContext();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadMutualFriends = async () => {
      // Check cache first
      if (state.mutualFriends.length > 0) {
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const currentUser = state.searchResults.user;
        if (!currentUser?.login) {
          setError("No user selected for mutual friends,Please search a user");
          return;
        }

        const response = await getMutualFriends(currentUser.login);
        if (!response.success) {
          throw new Error(response.error);
        }

        dispatch({
          type: "SET_MUTUAL_FRIENDS",
          payload: response.data || [],
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load mutual friends",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadMutualFriends();
  }, [
    state.mutualFriends.length,
    dispatch,
    setIsLoading,
    state.searchResults.user?.login,
  ]);

  const handleUserClick = async (user: any) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await searchUser(user.login);
      if (!response.success || !response.data) {
        throw new Error(response.error || "Failed to load user");
      }

      dispatch({
        type: "SET_SEARCH_RESULTS",
        payload: {
          user: response.data.user,
          repositories: response.data.repos,
        }, // already { user, repos }
      });

      dispatch({
        type: "SET_MUTUAL_FRIENDS",
        payload: [],
      });

      navigate("home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mutual-friends-page">
      <div className="page-header">
        <h1>Mutual Friends</h1>
        <p>Connect with your mutual connections on GitHub</p>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="friends-grid">
        {state.mutualFriends.map((friend) => (
          <UserCard
            key={friend.id}
            user={friend}
            onClick={() => handleUserClick(friend)}
          />
        ))}
      </div>

      {state.mutualFriends.length === 0 && !error && (
        <div className="empty-state">
          <h3>No Mutual Friends Found</h3>
          <p>You don't have any mutual friends at the moment.</p>
        </div>
      )}
    </div>
  );
}

export default MutualFriendsPage;
