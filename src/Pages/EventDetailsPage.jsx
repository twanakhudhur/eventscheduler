import { useParams } from 'react-router-dom';  
import { useEffect, useState } from 'react';  

const EventDetailsPage = () => {  
  const { id } = useParams();   
  const [event, setEvent] = useState(null);  
  const [loading, setLoading] = useState(true);   
  const [error, setError] = useState(null); 
  useEffect(() => {  
    const fetchEventDetails = async () => {  
      setLoading(true);   
      setError(null); // Reset the error state

      

      try {  
        const response = await fetch("http://localhost:3001/api${endpoint}", {  
          method: 'GET',  
          headers: {  
            "accept": "application/json",  
              
          },  
        });  

        if (!response.ok) {  
          throw new Error("Failed to fetch event details.");  
        }  

        const data = await response.json();  
        setEvent(data);   
      } catch (error) {  
        setError(error.message);   
      } finally {  
        setLoading(false);   
      }  
    };  

    fetchEventDetails();   
  }, [id]);  

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;  

  if (error) return <p className="text-center text-red-500">{error}</p>;  

  if (!event) return <p className="text-center text-gray-500">Event not found.</p>;  

  return (  
    <div>  
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">  
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>  
        <p className="text-gray-700 mb-4">{event.description}</p>  
        <p className="text-gray-600">Date: {new Date(event.date).toLocaleDateString()}</p>  
        <p className="text-gray-600">Time: {new Date(event.date).toLocaleTimeString()}</p>  
        <p className="text-gray-600">Location: {event.location}</p>  
      </div>  
    </div>  
  );  
};  

export default EventDetailsPage;
