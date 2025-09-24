import { MapPin, Link as LinkIcon, Calendar } from "lucide-react";
import type { User } from "../context/AppContext";
import "../styles/UserProfile.css";

interface UserProfileProps {
  user: User;
}

function UserProfile({ user }: UserProfileProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img src={user.avatarUrl} alt={user.login} className="avatar" />
        <div className="profile-info">
          <h3>{user.name || user.login}</h3>
          <p className="username">@{user.login}</p>
          {user.bio && <p className="bio">{user.bio}</p>}
          {user.location && (
            <p className="location">
              <MapPin size={16} />
              {user.location}
            </p>
          )}
          {user.blog && (
            <a
              href={user.blog}
              target="_blank"
              rel="noopener noreferrer"
              className="blog-link"
            >
              <LinkIcon size={16} />
              {user.blog}
            </a>
          )}
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat">
          <span className="stat-number">{user.public_repos}</span>
          <span className="stat-label">Repositories</span>
        </div>
        <div className="stat">
          <span className="stat-number">{user.public_gists}</span>
          <span className="stat-label">Gists</span>
        </div>
        <div className="stat">
          <span className="stat-number">{user.followers}</span>
          <span className="stat-label">Followers</span>
        </div>
        <div className="stat">
          <span className="stat-number">{user.following}</span>
          <span className="stat-label">Following</span>
        </div>
      </div>

      <div className="profile-meta">
        <p>
          <Calendar size={16} />
          Joined {formatDate(user.createdAt)}
        </p>
      </div>
    </div>
  );
}

export default UserProfile;
