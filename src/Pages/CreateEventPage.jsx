import { useState } from "react";  
import { useNavigate } from "react-router-dom";  

const CreateEventPage = () => {  
  const [name, setName] = useState("");  
  const [date, setDate] = useState("");  
  const [description, setDescription] = useState("");  
  const [error, setError] = useState(null);  
  const [success, setSuccess] = useState(null);  
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {  
    e.preventDefault();  

    setError(null);  
    setSuccess(null);  

      

    try {  
      const response = await fetch("/api/events", {  
        method: "POST",  
        headers: {  
          "Content-Type": "application/json",  
           
        },  
        body: JSON.stringify({ name, date, description }),  
      });  

      const data = await response.json();  

      if (!response.ok) {  
        throw new Error(  
          data.message || "Something went wrong while creating the event"  
        );  
      }  

      setSuccess("Event created successfully!");  

      // Fetch the updated list of events after creation  
      await fetchEvents();  

      // Navigate to the home page or event list page  
      navigate("/");  
    } catch (error) {  
      setError(error.message);  
    }  
  };  

  const fetchEvents = async () => {  
     
    try {  
      const response = await fetch("http://localhost:3001/api${endpoint}", {  
        method: "GET",  
        headers: {  
          "accept": "application/json",  
            
        },  
      });  

      const data = await response.json();  
      console.log(data); // You can handle the fetched events data as needed  
    } catch (error) {  
      console.error("Failed to fetch events:", error);  
    }  
  };  

  return (  
    <div className="mx-auto max-w-96">  
      <h2 className="text-2xl font-bold mb-6 text-center">Create Event</h2>  
      {error && <p className="text-red-500 text-xs text-center mb-4">{error}</p>}  
      {success && <p className="text-green-500 text-xs text-center mb-4">{success}</p>}  

      <form onSubmit={handleSubmit} className="space-y-5">  
        <div className="space-y-1">  
          <label htmlFor="name" className="block font-medium">Event Name</label>  
          <input  
            id="name"  
            name="name"  
            type="text"  
            value={name}  
            onChange={(e) => setName(e.target.value)}  
            className="w-full p-2.5 text-white rounded-lg bg-neutral outline-none focus:ring-2 focus:ring-neutral-content"  
            placeholder="Event Name"  
            required  
          />  
          {error && <p className="text-red-500 text-xs">{error}</p>}  
        </div>  

        <div className="space-y-1">  
          <label htmlFor="date" className="block font-medium">Event Date</label>  
          <input  
            id="date"  
            name="date"  
            type="date"  
            value={date}  
            onChange={(e) => setDate(e.target.value)}  
            className="w-full p-2.5 text-white rounded-lg bg-neutral outline-none focus:ring-2 focus:ring-neutral-content"  
            placeholder="Event Date"  
            required  
          />  
          {error && <p className="text-red-500 text-xs">{error}</p>}  
        </div>  

        <div className="space-y-1">  
          <label htmlFor="description" className="block font-medium">Description</label>  
          <textarea  
            id="description"  
            name="description"  
            value={description}  
            onChange={(e) => setDescription(e.target.value)}  
            className="w-full p-2.5 text-white rounded-lg bg-neutral outline-none focus:ring-2 focus:ring-neutral-content"  
            placeholder="Event Description"  
            required  
          />  
          {error && <p className="text-red-500 text-xs">{error}</p>}  
        </div>  

        <button  
          type="submit"  
          className="w-full bg-primary text-white py-2 rounded-lg bg-opacity-75 hover:bg-opacity-100"  
          disabled={false}  
        >  
          Create Event  
        </button>  
      </form>  
    </div>  
  );  
};  

export default CreateEventPage;
