import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import HTTP from "../lib/HTTP";
import { useToast } from "../context/ToastContext";

const HomePage = () => {
  const { showToast } = useToast();
  const [events, setEvents] = useState([]);
  const [pagination, setPagination] = useState({
    totalCount: 0,
    totalPages: 1,
    currentPage: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      setError(null);

      const { results, totalCount, totalPages, currentPage, hasNextPage, hasPreviousPage } = await HTTP(`/events?page=${page}&limit=${limit}`);

      setEvents(results);
      setPagination({
        totalCount,
        totalPages,
        currentPage,
        hasNextPage,
        hasPreviousPage,
      });
    } catch (error) {
      showToast(error.message, "error");
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(pagination.currentPage);
  }, [pagination.currentPage]);

  const handlePageChange = (page) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {events.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p className="text-center">No events available at the moment.</p>
      )}
      <div className="join mt-6">
        {pagination.hasPreviousPage && (
          <button
            className="join-item btn"
            onClick={() => handlePageChange(pagination.currentPage - 1)}
          >
            &lt;
          </button>
        )}
        {Array.from({ length: pagination.totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`join-item btn ${pagination.currentPage === index + 1 ? "btn-active" : ""}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        {pagination.hasNextPage && (
          <button
            className="join-item btn"
            onClick={() => handlePageChange(pagination.currentPage + 1)}
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
