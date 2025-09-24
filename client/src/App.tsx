import { useState } from "react";
import { AppProvider } from "./context/AppContext";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import RepoDetailsPage from "./pages/RepoDetailsPage";
import MutualFriendsPage from "./pages/MutualFriendsPage";
import UsersPage from "./pages/UsersPage";
import UserProfilePage from "./pages/UserProfilePage";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorBoundary from "./components/ErrorBoundary";
import "./styles/App.css";

export type AppView =
  | "home"
  | "repo-details"
  | "mutual-friends"
  | "users"
  | "user-profile";

export interface NavigationState {
  currentView: AppView;
  selectedRepo?: any;
  selectedUser?: any;
}

function App() {
  const [navigationState, setNavigationState] = useState<NavigationState>({
    currentView: "home",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [headerSearchQuery, setHeaderSearchQuery] = useState("");

  const navigate = (view: AppView, data?: { repo?: any; user?: any }) => {
    setNavigationState({
      currentView: view,
      selectedRepo: data?.repo,
      selectedUser: data?.user,
    });
  };

  const handleHeaderSearch = (username: string) => {
    // Navigate to home and trigger search
    navigate("home");
    // This will be handled by the HomePage component
    setTimeout(() => {
      const event = new CustomEvent("headerSearch", { detail: username });
      window.dispatchEvent(event);
    }, 100);
  };

  const handleHeaderSearchChange = (query: string) => {
    setHeaderSearchQuery(query);
  };

  const handleClearHeaderSearch = () => {
    setHeaderSearchQuery("");
  };

  const renderCurrentView = () => {
    switch (navigationState.currentView) {
      case "home":
        return <HomePage navigate={navigate} setIsLoading={setIsLoading} />;
      case "repo-details":
        return (
          <RepoDetailsPage
            repo={navigationState.selectedRepo}
            navigate={navigate}
            setIsLoading={setIsLoading}
          />
        );
      case "mutual-friends":
        return (
          <MutualFriendsPage navigate={navigate} setIsLoading={setIsLoading} />
        );
      case "users":
        return <UsersPage navigate={navigate} setIsLoading={setIsLoading} />;
      case "user-profile":
        return (
          <UserProfilePage
            user={navigationState.selectedUser}
            navigate={navigate}
            setIsLoading={setIsLoading}
          />
        );
      default:
        return <HomePage navigate={navigate} setIsLoading={setIsLoading} />;
    }
  };

  return (
    <ErrorBoundary>
      <AppProvider>
        <div className="app">
          <Header
            currentView={navigationState.currentView}
            navigate={navigate}
            onSearch={handleHeaderSearch}
            searchQuery={headerSearchQuery}
            onSearchChange={handleHeaderSearchChange}
            onClearSearch={handleClearHeaderSearch}
            showSearch={navigationState.currentView === "home"}
          />
          <main className="main-content">
            {isLoading && <LoadingSpinner />}
            {renderCurrentView()}
          </main>
        </div>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
