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

  if (!event) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{event.name}</h1>
      <p>{event.description}</p>
      <p>Date: {event.date}</p>
    </div>
  );
};

export default EventDetailsPage;
