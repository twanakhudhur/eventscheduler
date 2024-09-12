import React, { useState } from "react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import HTTP from "../lib/HTTP";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DeleteAccountBtn = ({id}) => {
  const { showToast } = useToast();
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  const handleDelete = async () => {
    try {
      await HTTP(`/users/${id}`, { method: "DELETE" });
      showToast("Account deleted successfully!", "warning");
      handleLogout();
      navigate("/");
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setModalOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-red-500 text-white py-2 px-4 rounded-lg"
      >
        Delete Account
      </button>

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Account"
        description="Are you sure you want to delete your account? This action cannot be undone."
        confirmLabel="Delete Account"
        cancelLabel="Cancel"
      />
    </>
  );
};

export default DeleteAccountBtn;
