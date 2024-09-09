import  { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';

const HomePage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
   
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');  
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {events.length > 0 ? (
          events.map(event => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <p>No events available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
