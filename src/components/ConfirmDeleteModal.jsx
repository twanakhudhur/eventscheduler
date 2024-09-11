const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100]">
      <div className="modal modal-open">
        <div className="modal-box">
          <h2 className="text-lg font-bold">Confirm Delete</h2>
          <p>Are you sure you want to delete this item?</p>
          <div className="modal-action">
            <button onClick={onConfirm} className="btn btn-error">
              Delete
            </button>
            <button onClick={onClose} className="btn">
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div
        className="fixed inset-0 bg-black opacity-40"
        onClick={onClose}
      ></div>
    </div>
  );
};

export default ConfirmDeleteModal;
