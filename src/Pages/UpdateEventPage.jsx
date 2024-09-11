import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateEventPage = () => {
  const { eventId } = useParams(); // Get the event ID from the URL
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the current event details
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }

        // Set the existing event data to state variables
        setName(data.name);
        setDate(new Date(data.date).toISOString().split("T")[0]); // Format date for the input field
        setDescription(data.description);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, date, description }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong while updating the event");
      }

      setSuccess("Event updated successfully!");
      
      // Optionally navigate to another page or refresh the list
      navigate("/events");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="mx-auto max-w-96">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Event</h2>
      {error && <p className="text-red-500 text-xs text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-xs text-center mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label htmlFor="name" className="block font-medium">Event Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2.5 text-white rounded-lg bg-neutral outline-none focus:ring-2 focus:ring-neutral-content"
            placeholder="Event Name"
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="date" className="block font-medium">Event Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2.5 text-white rounded-lg bg-neutral outline-none focus:ring-2 focus:ring-neutral-content"
            placeholder="Event Date"
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="description" className="block font-medium">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2.5 text-white rounded-lg bg-neutral outline-none focus:ring-2 focus:ring-neutral-content"
            placeholder="Event Description"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg bg-opacity-75 hover:bg-opacity-100"
          disabled={false}
        >
          Update Event
        </button>
      </form>
    </div>
  );
};

export default UpdateEventPage;
