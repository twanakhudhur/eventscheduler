import { MdDelete } from "react-icons/md";

export default function DeleteBtn({ id }) {
  return (
    <button className="bg-error hover:scale-105 rounded p-2">
      <MdDelete />
    </button>
  );
}
