import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const EventDetailsPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`/api/events/${id}`)  // Replace with actual API URL
      .then(response => response.json())
      .then(data => setEvent(data));
  }, [id]);

  if (!event) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.name}</h1>
        <p className="text-gray-700 mb-4">{event.description}</p>
        <p className="text-gray-600">Date: {new Date(event.date).toLocaleDateString()}</p>
        <p className="text-gray-600">Time: {new Date(event.date).toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

export default EventDetailsPage;
