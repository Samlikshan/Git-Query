import type { User } from "../context/AppContext";
import "../styles/UserCard.css";

interface UserCardProps {
  user: User;
  onClick: () => void;
}

function UserCard({ user, onClick }: UserCardProps) {
  return (
    <div className="user-card" onClick={onClick}>
      <img src={user.avatarUrl} alt={user.login} className="user-avatar" />
      <div className="user-info">
        <h3>{user.name || user.login}</h3>
        <p className="username">@{user.login}</p>
        {user.bio && <p className="user-bio">{user.bio}</p>}
        <div className="user-stats">
          <span>{user.public_repos} repos</span>
          <span>{user.followers} followers</span>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
