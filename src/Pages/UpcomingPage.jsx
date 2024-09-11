import React, { useEffect, useState } from "react";
import HTTP from "../lib/HTTP";
import EventCard from "../components/EventCard";
import { useToast } from "../context/ToastContext";
import Empty from "../components/Empty";

const UpcomingPage = () => {
  const { showToast } = useToast();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const data = await HTTP(`/events/upcoming`, { method: "GET" });
        setEvents(data);
      } catch (err) {
        showToast(err.message, "error");
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
      {error && <p className="text-center text-red-500">{error}</p>}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, index) => (
            <div key={index} className="card bg-primary skeleton rounded-lg p-3">
              <div className="card-body">
                <h2 className="card-title skeleton h-3 w-3/4 mb-4"></h2>
                <p className="skeleton h-3 w-1/2 mb-2"></p>
              </div>
            </div>
          ))}
        </div>
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <Empty message={"No upcoming events found."} />
      )}
    </div>
  );
};

export default UpcomingPage;
