import React, { useState } from "react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import HTTP from "../lib/HTTP";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const DeleteBtn = ({ id }) => {
  const { showToast } = useToast();
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await HTTP(`/events/${id}`, { method: "DELETE" });
      showToast("Event deleted successfully!", "warning");
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
        className="bg-error hover:scale-105 rounded p-2"
        aria-label="Delete"
      >
        <MdDelete />
      </button>

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Event"
        description="Are you sure you want to delete this event? This action cannot be undone."
        confirmLabel="Delete Event"
        cancelLabel="Cancel"
      />
    </>
  );
};

export default DeleteBtn;
