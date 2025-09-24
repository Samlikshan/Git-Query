import React, { useState, useEffect } from "react";
import Button from "./Button";
import "../styles/SearchBar.css";

interface SearchBarProps {
  onSearch: (username: string) => void;
  initialValue?: string;
}

function SearchBar({ onSearch, initialValue = "" }: SearchBarProps) {
  const [username, setUsername] = useState(initialValue);

  useEffect(() => {
    setUsername(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(username);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input-container">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username..."
          className="search-input"
        />
        <Button type="submit" disabled={!username.trim()}>
          Search
        </Button>
      </div>
    </form>
  );
}

export default SearchBar;
