import React from "react";
import { Link } from "react-router-dom";
import { format, isPast, isToday, isThisWeek, isThisMonth } from "date-fns";

const EventCard = ({ event }) => {
  const eventDate = new Date(event.date);

  const getEventStatus = () => {
    if (isPast(eventDate) && !isToday(eventDate)) return "bg-error";
    if (isToday(eventDate)) return "bg-error";
    if (isThisWeek(eventDate)) return "bg-warning";
    if (isThisMonth(eventDate)) return "bg-secondary";
    return "bg-primary";
  };

  return (
    <Link to={`/events/${event.id}`}>
      <div className={`card text-primary-content ${getEventStatus()} bg-opacity-85 hover:bg-opacity-100 hover:scale-105`}>
        <div className="card-body">
          <h2 className="card-title capitalize">{event.title}</h2>
          <p>{format(eventDate, "MMM d, yyyy HH:mm")}</p>
          <p className="capitalize">{event.location}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
