import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden">
      <div className="p-5">
        <h3 className="text-2xl font-bold mb-2">{event.name}</h3>
        <p className="text-gray-500 mb-4">{new Date(event.date).toLocaleDateString()}</p>
        <p className="text-gray-700 mb-4">{event.description.substring(0, 100)}...</p>
        <Link 
          to={`/events/${event.id}`} 
          className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    name: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventCard;
