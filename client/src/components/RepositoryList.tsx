import { Star, GitFork, Clock } from "lucide-react";
import type { Repository } from "../context/AppContext";
import "../styles/RepositoryList.css";

interface RepositoryListProps {
  repositories: Repository[];
  onRepoClick: (repo: Repository) => void;
}

function RepositoryList({ repositories, onRepoClick }: RepositoryListProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="repository-list">
      {repositories.map((repo) => (
        <div
          key={repo.id}
          className="repository-card"
          onClick={() => onRepoClick(repo)}
        >
          <div className="repo-header">
            <h3 className="repo-name">{repo.name}</h3>
            <div className="repo-stats">
              <span className="stat">
                <Star size={14} />
                {repo.stargazers_count}
              </span>
              <span className="stat">
                <GitFork size={14} />
                {repo.forks_count}
              </span>
            </div>
          </div>

          {repo.description && (
            <p className="repo-description">{repo.description}</p>
          )}

          <div className="repo-footer">
            <div className="repo-meta">
              {repo.language && (
                <span className="language">{repo.language}</span>
              )}
              <span className="updated-date">
                <Clock size={14} />
                Updated {formatDate(repo.updated_at)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RepositoryList;
