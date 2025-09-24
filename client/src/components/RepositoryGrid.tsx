import {
  Star,
  GitFork,
  Eye,
  AlertCircle,
  Calendar,
  ExternalLink,
} from "lucide-react";
import type { Repository } from "../context/AppContext";
import "../styles/RepositoryGrid.css";

interface RepositoryGridProps {
  repositories: Repository[];
  onRepoClick: (repo: Repository) => void;
}

function RepositoryGrid({ repositories, onRepoClick }: RepositoryGridProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getLanguageColor = (language: string | null) => {
    const colors: { [key: string]: string } = {
      JavaScript: "#f1e05a",
      TypeScript: "#2b7489",
      Python: "#3572A5",
      Java: "#b07219",
      C: "#555555",
      "C++": "#f34b7d",
      "C#": "#239120",
      PHP: "#4F5D95",
      Ruby: "#701516",
      Go: "#00ADD8",
      Rust: "#dea584",
      Swift: "#ffac45",
      Kotlin: "#F18E33",
      HTML: "#e34c26",
      CSS: "#1572B6",
      Shell: "#89e051",
      Dockerfile: "#384d54",
    };
    return colors[language || ""] || "#6b7280";
  };

  return (
    <div className="repository-grid">
      {repositories.map((repo) => (
        <div
          key={repo.id}
          className="repo-card"
          onClick={() => onRepoClick(repo)}
        >
          <div className="repo-card-header">
            <div className="repo-title">
              <h3 className="repo-name">{repo.name}</h3>
              <div className="repo-visibility">
                {repo.private ? (
                  <span className="visibility-badge private">Private</span>
                ) : (
                  <span className="visibility-badge public">Public</span>
                )}
              </div>
            </div>
            <ExternalLink className="external-link-icon" size={16} />
          </div>

          {repo.description && (
            <p className="repo-description">{repo.description}</p>
          )}

          <div className="repo-stats">
            <div className="stat-item">
              <Star size={14} />
              <span>{repo.stargazers_count}</span>
            </div>
            <div className="stat-item">
              <GitFork size={14} />
              <span>{repo.forks_count}</span>
            </div>
            <div className="stat-item">
              <Eye size={14} />
              <span>{repo.watchers_count || 0}</span>
            </div>
            {repo.open_issues_count > 0 && (
              <div className="stat-item">
                <AlertCircle size={14} />
                <span>{repo.open_issues_count}</span>
              </div>
            )}
          </div>

          <div className="repo-footer">
            <div className="repo-meta">
              {repo.language && (
                <div className="language-info">
                  <span
                    className="language-dot"
                    style={{ backgroundColor: getLanguageColor(repo.language) }}
                  ></span>
                  <span className="language-name">{repo.language}</span>
                </div>
              )}
              <div className="updated-info">
                <Calendar size={12} />
                <span>Updated {formatDate(repo.updated_at)}</span>
              </div>
            </div>

            {repo.homepage && (
              <div className="homepage-link">
                <ExternalLink size={12} />
                <span>Live Demo</span>
              </div>
            )}
          </div>

          {repo.topics && repo.topics.length > 0 && (
            <div className="repo-topics">
              {repo.topics.slice(0, 3).map((topic: string) => (
                <span key={topic} className="topic-tag">
                  {topic}
                </span>
              ))}
              {repo.topics.length > 3 && (
                <span className="topic-more">+{repo.topics.length - 3}</span>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default RepositoryGrid;
