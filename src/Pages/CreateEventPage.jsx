import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HTTP from "../lib/HTTP";
import { useToast } from "../context/ToastContext";

const CreateEventPage = () => {
  const { showToast } = useToast();
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    latitude: "",
    longitude: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.title.trim()) newErrors.title = "Title is required.";
    else if (formValues.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters long.";
    }
    if (!formValues.date.trim()) newErrors.date = "Date is required.";
    if (!formValues.description.trim())
      newErrors.description = "Description is required.";
    if (!formValues.location.trim())
      newErrors.location = "Location is required.";
    if (!formValues.latitude.trim())
      newErrors.latitude = "Latitude is required.";
    if (!formValues.longitude.trim())
      newErrors.longitude = "Longitude is required.";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const response = await HTTP("/events", {
        method: "POST",
        body: JSON.stringify(formValues),
      });

      if (response.error) {
        throw new Error(response.error);
      }
      showToast("Event created successfully!", "success");
      navigate("/");
    } catch (error) {
      showToast(error.message, "error");
      setErrors({ api: error.message });
    }
  };

  return (
    <div className="mx-auto max-w-96">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Event</h2>
      {errors.api && (
        <p className="text-red-500 text-xs text-center mb-4">{errors.api}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label htmlFor="title" className="block font-medium">
            Event Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formValues.title}
            onChange={handleChange}
            className="w-full p-2.5 text-white rounded-lg bg-neutral outline-none focus:ring-2 focus:ring-neutral-content"
            placeholder="Event Title"
          />
          {errors.title && (
            <p className="text-red-500 text-xs">{errors.title}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="date" className="block font-medium">
            Event Date
          </label>
          <input
            id="date"
            name="date"
            type="datetime-local"
            value={formValues.date}
            onChange={handleChange}
            className="w-full p-2.5 text-white rounded-lg bg-neutral outline-none focus:ring-2 focus:ring-neutral-content"
          />
          {errors.date && <p className="text-red-500 text-xs">{errors.date}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="description" className="block font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formValues.description}
            onChange={handleChange}
            className="w-full p-2.5 text-white rounded-lg bg-neutral outline-none focus:ring-2 focus:ring-neutral-content"
            placeholder="Event Description"
          />
          {errors.description && (
            <p className="text-red-500 text-xs">{errors.description}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="location" className="block font-medium">
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            value={formValues.location}
            onChange={handleChange}
            className="w-full p-2.5 text-white rounded-lg bg-neutral outline-none focus:ring-2 focus:ring-neutral-content"
            placeholder="Event Location"
          />
          {errors.location && (
            <p className="text-red-500 text-xs">{errors.location}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="latitude" className="block font-medium">
            Latitude
          </label>
          <input
            id="latitude"
            name="latitude"
            type="number"
            step="any"
            value={formValues.latitude}
            onChange={handleChange}
            className="w-full p-2.5 text-white rounded-lg bg-neutral outline-none focus:ring-2 focus:ring-neutral-content"
            placeholder="Latitude"
          />
          {errors.latitude && (
            <p className="text-red-500 text-xs">{errors.latitude}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="longitude" className="block font-medium">
            Longitude
          </label>
          <input
            id="longitude"
            name="longitude"
            type="number"
            step="any"
            value={formValues.longitude}
            onChange={handleChange}
            className="w-full p-2.5 text-white rounded-lg bg-neutral outline-none focus:ring-2 focus:ring-neutral-content"
            placeholder="Longitude"
          />
          {errors.longitude && (
            <p className="text-red-500 text-xs">{errors.longitude}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg bg-opacity-75 hover:bg-opacity-100"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEventPage;

// SHORTER WAY

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import HTTP from "../lib/HTTP";
// import { useToast } from "../context/ToastContext";

// const CreateEventPage = () => {
//   const { showToast } = useToast();
//   const [formValues, setFormValues] = useState({
//     title: "",
//     description: "",
//     date: "",
//     location: "",
//     latitude: "",
//     longitude: "",
//   });
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues((prevValues) => ({
//       ...prevValues,
//       [name]: value,
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formValues.title.trim()) newErrors.title = "Title is required.";
//     else if (formValues.title.length < 3) {
//       newErrors.title = "Title must be at least 3 characters long.";
//     }
//     if (!formValues.date.trim()) newErrors.date = "Date is required.";
//     if (!formValues.description.trim()) newErrors.description = "Description is required.";
//     if (!formValues.location.trim()) newErrors.location = "Location is required.";
//     if (!formValues.latitude.trim()) newErrors.latitude = "Latitude is required.";
//     if (!formValues.longitude.trim()) newErrors.longitude = "Longitude is required.";

//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     setErrors({});

//     try {
//       const response = await HTTP("/events", {
//         method: "POST",
//         body: JSON.stringify(formValues),
//       });

//       if (response.error) {
//         throw new Error(response.error);
//       }
//       showToast("Event created successfully!", "success");
//       navigate("/");
//     } catch (error) {
//       showToast(error.message, "error");
//       setErrors({ api: error.message });
//     }
//   };

//   return (
//     <div className="mx-auto max-w-96">
//       <h2 className="text-2xl font-bold mb-6 text-center">Create Event</h2>
//       {errors.api && <p className="text-red-500 text-xs text-center mb-4">{errors.api}</p>}

//       <form onSubmit={handleSubmit} className="space-y-5">
//         {["title", "date", "description", "location", "latitude", "longitude"].map((field) => (
//           <div key={field} className="space-y-1">
//             <label htmlFor={field} className="block font-medium">
//               {field.charAt(0).toUpperCase() + field.slice(1)}
//             </label>
//             <input
//               id={field}
//               name={field}
//               type={field === "date" ? "datetime-local" : "text"}
//               step={field === "latitude" || field === "longitude" ? "any" : undefined}
//               value={formValues[field]}
//               onChange={handleChange}
//               className="w-full p-2.5 text-white rounded-lg bg-neutral outline-none focus:ring-2 focus:ring-neutral-content"
//               placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//             />
//             {errors[field] && <p className="text-red-500 text-xs">{errors[field]}</p>}
//           </div>
//         ))}

//         <button
//           type="submit"
//           className="w-full bg-primary text-white py-2 rounded-lg bg-opacity-75 hover:bg-opacity-100"
//         >
//           Create Event
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateEventPage;
