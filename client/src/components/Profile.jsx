import React, { useState, useEffect } from "react";
import { useProfile } from "../hooks/useProfile";

const Profile = () => {
  const { data, isLoading, error, saveProfile, isSaving, saveError } =
    useProfile();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (data?.user) {
      setName(data.user.name || "");
      setBio(data.user.bio || "");
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Name is required");
      return;
    }
    saveProfile({ name: name.trim(), bio: bio.trim() });
  };

  if (isLoading)
    return <div className="profile-loading">Loading profile...</div>;
  if (error) return <div className="profile-error">Error: {error.message}</div>;

  const { user } = data || {};

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={user?.imageUrl || "/default-avatar.png"}
          alt="Profile"
          className="profile-avatar"
        />
        <h2>
          {user?.firstName} {user?.lastName}
        </h2>
        <p>{user?.email}</p>
      </div>

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself"
            rows="4"
          />
        </div>

        <button type="submit" disabled={isSaving} className="save-btn">
          {isSaving ? "Saving..." : "Save Profile"}
        </button>

        {saveError && (
          <div className="error-msg">Error saving: {saveError.message}</div>
        )}
      </form>
    </div>
  );
};

export default Profile;
