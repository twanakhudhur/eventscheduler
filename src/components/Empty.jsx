import { FiDatabase } from "react-icons/fi";

export default function Empty({ message }) {
  return (
    <div className="space-y-5">
          <p className="text-center">{message}</p>
          <FiDatabase className="text-3xl mx-auto" />
        </div>
  )
}
