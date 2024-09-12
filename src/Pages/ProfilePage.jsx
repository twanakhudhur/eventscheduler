import React, { useState, useEffect } from "react";
import HTTP from "../lib/HTTP";
import { useToast } from "../context/ToastContext";
import { IoClose } from "react-icons/io5";
import DeleteAccountBtn from "../components/DeleteAccountBtn";

export default function ProfilePage() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    email: "",
    isActive: true,
    createdAt: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await HTTP("/auth/profile", { method: "GET" });

        if (!response) {
          throw new Error("Failed to fetch profile");
        }

        setProfile(response);
      } catch (error) {
        showToast(error.message, "error");
      }
    };

    fetchProfile();
  }, [showToast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await HTTP(`/users/${profile.id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: profile.name,
          email: profile.email,
        }),
      });

      if (response.error) {
        throw new Error(response.error);
      }

      showToast("Profile updated successfully!", "success");
      setIsEditing(false);
    } catch (error) {
      setLoading(false);
      showToast(error.message, "error");
      setErrors({ api: error.message });
    }
  };

  return (
    <div className="flex justify-between mx-auto">
      <div className="w-1/2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold mb-4">Profile Information</h2>
          {isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-neutral text-base-content bg-opacity-50 hover:bg-opacity-100 py-2 px-4 rounded-lg"
            >
              <IoClose />
            </button>
          )}
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="block font-medium">ID:</label>
            <p>{profile.id}</p>
          </div>

          <div className="flex items-center gap-4">
            <label className="block font-medium">Name:</label>
            {isEditing ? (
              <input
                name="name"
                type="text"
                value={profile.name}
                onChange={handleInputChange}
                className="w-full p-2.5 rounded-lg bg-neutral text-white outline-none"
              />
            ) : (
              <p>{profile.name}</p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <label className="block font-medium">Email:</label>
            {isEditing ? (
              <input
                name="email"
                type="email"
                value={profile.email}
                onChange={handleInputChange}
                className="w-full p-2.5 rounded-lg bg-neutral text-white outline-none"
              />
            ) : (
              <p>{profile.email}</p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <label className="block font-medium">Status:</label>
            <p>{profile.isActive ? "Active" : "Inactive"}</p>
          </div>

          <div className="flex items-center gap-4">
            <label className="block font-medium">Joined Since:</label>
            <p>{new Date(profile.createdAt).toLocaleDateString("en-CA")}</p>
          </div>
          <form onSubmit={handleUpdateProfile} className="space-y-4 w-full">
            {errors.api && (
              <p className="text-red-500 text-xs text-center mb-4">
                {errors.api}
              </p>
            )}
            {isEditing && (
              <div className="w-full">
                <button
                  type="submit"
                  className="bg-primary bg-opacity-75 hover:bg-opacity-100 text-white py-2 px-4 rounded-lg w-full"
                  disabled={loading}
                >
                  Update Profile
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      <div className="flex items-start justify-end gap-4">
        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="bg-primary bg-opacity-75 hover:bg-opacity-100 text-white py-2 px-4 rounded-lg"
          >
            Edit Profile
          </button>
        )}

        <DeleteAccountBtn id={profile?.id} />
      </div>
    </div>
  );
}
