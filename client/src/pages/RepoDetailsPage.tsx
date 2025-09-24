import Button from "../components/Button";
import type { AppView } from "../App";
import "../styles/RepoDetailsPage.css";

interface RepoDetailsPageProps {
  repo: any;
  navigate: (view: AppView) => void;
  setIsLoading: (loading: boolean) => void;
}

function RepoDetailsPage({ repo, navigate }: RepoDetailsPageProps) {
  if (!repo) {
    return (
      <div className="repo-details-page">
        <div className="error-state">
          <h2>Repository Not Found</h2>
          <Button onClick={() => navigate("home")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="repo-details-page">
      <div className="back-button-container">
        <Button onClick={() => navigate("home")} variant="secondary">
          ← Back to Search
        </Button>
      </div>

      <div className="repo-header">
        <h1>{repo.name}</h1>
        {repo.description && (
          <p className="repo-description">{repo.description}</p>
        )}
      </div>

      <div className="repo-stats">
        <div className="stat-item">
          <span className="stat-label">Stars</span>
          <span className="stat-value">{repo.stargazers_count}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Forks</span>
          <span className="stat-value">{repo.forks_count}</span>
        </div>
        {repo.language && (
          <div className="stat-item">
            <span className="stat-label">Language</span>
            <span className="stat-value">{repo.language}</span>
          </div>
        )}
      </div>

      <div className="repo-details">
        <div className="detail-section">
          <h3>Repository Information</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">Full Name:</span>
              <span className="detail-value">{repo.full_name}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Created:</span>
              <span className="detail-value">{formatDate(repo.createdAt)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Last Updated:</span>
              <span className="detail-value">{formatDate(repo.updatedAt)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">GitHub URL:</span>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="repo-link"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RepoDetailsPage;
