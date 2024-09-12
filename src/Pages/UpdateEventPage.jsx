import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HTTP from "../lib/HTTP";
import { useToast } from "../context/ToastContext";

const UpdateEventPage = () => {
  const { showToast } = useToast();
  const { id } = useParams();
  const [updateLoading, setUpdateLoading] = useState(true);
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    latitude: "",
    longitude: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        const response = await HTTP(`/events/${id}`, { method: "GET" });

        if (!response) {
          throw new Error("Failed to fetch event details");
        }

        setFormValues({
          title: response.title,
          description: response.description,
          date: new Date(response.date).toISOString().split("T")[0],
          location: response.location,
          latitude: response.latitude,
          longitude: response.longitude,
        });
      } catch (error) {
        showToast(error.message, "error");
        setErrors({ api: error.message });
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id, showToast]);

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
    if (!formValues.date.trim()) newErrors.date = "Date is required.";
    if (!formValues.description.trim())
      newErrors.description = "Description is required.";
    if (!formValues.location.trim())
      newErrors.location = "Location is required.";
    if (!String(formValues.latitude).trim())
      newErrors.latitude = "Latitude is required.";
    if (!String(formValues.longitude).trim())
      newErrors.longitude = "Longitude is required.";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setUpdateLoading(false);
      return;
    }

    setErrors({});

    try {
      const response = await HTTP(`/events/${id}`, {
        method: "PUT",
        body: JSON.stringify(formValues),
      });

      if (response.error) {
        throw new Error(response.error);
      }

      showToast("Event updated successfully!", "success");
      navigate("/events");
    } catch (error) {
      setUpdateLoading(false);
      showToast(error.message, "error");
      setErrors({ api: error.message });
    }
  };

  return (
    <div className="mx-auto max-w-96">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Event</h2>
      {errors.api && (
        <p className="text-red-500 text-xs text-center mb-4">{errors.api}</p>
      )}
      {loading ? (
        <>
          <div className="space-y-5">
            <div className="space-y-1">
              <div className="h-5 w-1/3 bg-primary rounded skeleton"></div>
              <div className="h-10 w-full bg-primary rounded skeleton"></div>
            </div>
            <div className="space-y-1">
              <div className="h-5 w-1/3 bg-primary rounded skeleton"></div>
              <div className="h-10 w-full bg-primary rounded skeleton"></div>
            </div>
            <div className="space-y-1">
              <div className="h-5 w-1/3 bg-primary rounded skeleton"></div>
              <div className="h-10 w-full bg-primary rounded skeleton"></div>
            </div>
          </div>
        </>
      ) : (
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
              required
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
              type="date"
              value={formValues.date}
              onChange={handleChange}
              className="w-full p-2.5 text-white rounded-lg bg-neutral outline-none focus:ring-2 focus:ring-neutral-content"
              placeholder="Event Date"
              required
            />
            {errors.date && (
              <p className="text-red-500 text-xs">{errors.date}</p>
            )}
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
              required
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
              required
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
              required
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
              required
            />
            {errors.longitude && (
              <p className="text-red-500 text-xs">{errors.longitude}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg bg-opacity-75 hover:bg-opacity-100"
            disabled={updateLoading}
          >
            Update Event
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateEventPage;
