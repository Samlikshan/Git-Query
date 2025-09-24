import React from "react";
import { Search, Users, Database, X } from "lucide-react";
import type { AppView } from "../App";
import "../styles/Header.css";

interface HeaderProps {
  currentView: AppView;
  navigate: (view: AppView) => void;
  onSearch?: (username: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onClearSearch?: () => void;
  showSearch?: boolean;
}

function Header({
  currentView,
  navigate,
  onSearch,
  searchQuery = "",
  onSearchChange,
  onClearSearch,
  showSearch = false,
}: HeaderProps) {
  const navItems = [
    { key: "home" as AppView, label: "Search", icon: Search },
    { key: "mutual-friends" as AppView, label: "Mutual Friends", icon: Users },
    { key: "users" as AppView, label: "Users Database", icon: Database },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </div>
          <span className="logo-text">GitHub Explorer</span>
        </div>

        {showSearch && (
          <div className="header-search">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <div className="search-input-wrapper">
                <Search className="search-icon" size={18} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  placeholder="Search GitHub users..."
                  className="header-search-input"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={onClearSearch}
                    className="clear-search-btn"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        <nav className="navigation">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`nav-item ${currentView === item.key ? "active" : ""}`}
              onClick={() => navigate(item.key)}
            >
              <item.icon className="nav-icon" size={18} />
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
