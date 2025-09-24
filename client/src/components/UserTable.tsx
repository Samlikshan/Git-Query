import { useState } from "react";
import type { User } from "../context/AppContext";
import Button from "./Button";
import Modal from "./Modal";
import ConfirmationModal from "./ConfirmationModal";
import "../styles/UserTable.css";

interface UserTableProps {
  users: User[];
  onUpdateUser: (
    username: string,
    userData: { bio?: string; blog?: string; location?: string },
  ) => void;
  onDeleteUser: (username: string) => void;
  onUserClick: (user: User) => void;
}

interface EditData {
  bio: string;
  blog: string;
  location: string;
}

function UserTable({
  users,
  onUpdateUser,
  onDeleteUser,
  onUserClick,
}: UserTableProps) {
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editData, setEditData] = useState<EditData>({
    bio: "",
    blog: "",
    location: "",
  });
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setEditData({
      bio: user.bio || "",
      blog: user.blog || "",
      location: user.location || "",
    });
  };

  const handleSave = () => {
    if (editingUser) {
      onUpdateUser(editingUser.login, editData);
      setEditingUser(null);
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
  };

  const handleDeleteClick = (user: User) => {
    setDeletingUser(user);
  };

  const handleConfirmDelete = () => {
    if (deletingUser) {
      onDeleteUser(deletingUser.login);
      setDeletingUser(null);
    }
  };

  const handleCancelDelete = () => {
    setDeletingUser(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Bio</th>
              <th>Location</th>
              <th>Blog</th>
              <th>Repos</th>
              <th>Followers</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="user-cell" onClick={() => onUserClick(user)}>
                    <img
                      src={user.avatarUrl}
                      alt={user.login}
                      className="table-avatar"
                    />
                    <div>
                      <div className="user-name">{user.name || user.login}</div>
                      <div className="user-login">@{user.login}</div>
                    </div>
                  </div>
                </td>
                <td className="bio-cell">{user.bio || "-"}</td>
                <td>{user.location || "-"}</td>
                <td>
                  {user.blog ? (
                    <a
                      href={user.blog}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="blog-link"
                    >
                      {user.blog}
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td>{user.public_repos}</td>
                <td>{user.followers}</td>
                <td>{formatDate(user.createdAt)}</td>
                <td>
                  <div className="action-buttons">
                    <Button
                      variant="secondary"
                      size="small"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="small"
                      onClick={() => handleDeleteClick(user)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingUser && (
        <Modal title="Edit User" onClose={handleCancel}>
          <div className="edit-form">
            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                value={editData.bio}
                onChange={(e) =>
                  setEditData({ ...editData, bio: e.target.value })
                }
                placeholder="User bio..."
                rows={3}
              />
            </div>
            <div className="form-group">
              <label htmlFor="blog">Blog</label>
              <input
                type="url"
                id="blog"
                value={editData.blog}
                onChange={(e) =>
                  setEditData({ ...editData, blog: e.target.value })
                }
                placeholder="https://example.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                value={editData.location}
                onChange={(e) =>
                  setEditData({ ...editData, location: e.target.value })
                }
                placeholder="City, Country"
              />
            </div>
            <div className="form-actions">
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        </Modal>
      )}

      {deletingUser && (
        <ConfirmationModal
          title="Delete User"
          message={`Are you sure you want to delete ${deletingUser.name || deletingUser.login}? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          isDestructive={true}
        />
      )}
    </>
  );
}

export default UserTable;
