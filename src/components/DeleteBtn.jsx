import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import HTTP from "../lib/HTTP";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";

const DeleteBtn = ({ id }) => {
  const { showToast } = useToast();
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await HTTP(`/events/${id}`, { method: "DELETE" });

      showToast("Event Deleted successfully!", "warning");
      navigate("/");
    } catch (error) {
      console.log(error);
      
      showToast(error.message, "error");
      setError(error.message);
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
      />
    </>
  );
};

export default DeleteBtn;
