import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import HTTP from "../lib/HTTP";
import { useToast } from "../context/ToastContext";
import Pagination from "../components/Pagination";
import Empty from "../components/Empty";

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

      const response = await HTTP(`/events?page=${page}&limit=${limit}`);
      const { results, totalCount, totalPages, currentPage, hasNextPage, hasPreviousPage } = response;

      setEvents(results);
      setPagination({ totalCount, totalPages, currentPage, hasNextPage, hasPreviousPage });
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

  const handlePageChange = (page) => setPagination((prev) => ({ ...prev, currentPage: page }));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Events</h1>
      {loading && (
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
      )}
      {error && <p className="text-center text-red-500">{error}</p>}
      {events.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <Pagination pagination={pagination} handlePageChange={handlePageChange} />
        </>
      ) : (
        <Empty message={"No events available at the moment."} />
      )}
    </div>
  );
};

export default HomePage;
