import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HTTP from "../lib/HTTP";
import { format, isPast, isToday, isThisWeek, isThisMonth } from "date-fns";
import { useToast } from "../context/ToastContext";
import { MdEdit } from "react-icons/md";
import DeleteBtn from "../components/DeleteBtn";
import Map from "../components/Map";
import Empty from "../components/Empty";

const EventDetailsPage = () => {
  const { showToast } = useToast();
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const data = await HTTP(`/events/${id}`, { method: "GET" });
        setEvent(data);
      } catch (err) {
        showToast(err.message, "error");
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  const getEventStatus = () => {
    if (!event) return "bg-primary";
    const eventDate = new Date(event.date);
    if (isPast(eventDate) && !isToday(eventDate)) return "bg-error";
    if (isToday(eventDate)) return "bg-error";
    if (isThisWeek(eventDate)) return "bg-warning";
    if (isThisMonth(eventDate)) return "bg-secondary";
    return "bg-primary";
  };

  return (
    <>
      {error && <p className="text-center text-red-500">{error}</p>}
      {loading && (
        <>
          <div className="p-6 rounded-lg shadow-lg bg-primary skeleton">
            <div className="skeleton h-4 w-1/2 mb-4"></div>
            <div className="space-y-4">
              <div className="skeleton h-2 w-1/3 mb-2"></div>
              <div className="skeleton h-2 w-full"></div>
              <div className="skeleton h-2 w-2/3"></div>
            </div>
            <div className="skeleton h-2 w-1/2 mt-5"></div>
          </div>
        </>
      )}
      {event ? (
        <>
          <div className="w-fuull rounded-t-lg bg-base-200 border border-neutral flex items-center justify-end gap-2 py-2 px-4 shadow-sm  text-white shadow-neutral-content text-xl">
            <DeleteBtn id={event?.id} />
            <button
              className={`hover:scale-105 rounded p-2 ${getEventStatus()}`}
            >
              <MdEdit />
            </button>
          </div>
          <div
            className={`p-6 rounded-b-lg text-primary-content shadow-lg font-semibold ${getEventStatus()}`}
          >
            <h1 className="text-3xl font-bold mb-5 capitalize">
              {event.title}
            </h1>
            <div className="space-y-2">
              <p className="">
                {format(new Date(event.date), "MMM d, yyyy HH:mm")}
              </p>
              <p className="">{event.description}</p>
            </div>
            <p className="mt-5 capitalize"> {event.location}</p>

            <Map event={event} />
          </div>
        </>
      ) : (
        <Empty message={"Event not found"} />
      )}
    </>
  );
};

export default EventDetailsPage;
