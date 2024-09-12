import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import HTTP from "../lib/HTTP";
import { useToast } from "../context/ToastContext";

const SignUpPage = () => {
  const { showToast } = useToast();
  const { token } = useAuth();
  const navigate = useNavigate();

  if (token) {
    return <Navigate to="/" />;
  }

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.name.trim()) newErrors.name = "Name is required.";
    if (!formValues.email.trim()) newErrors.email = "Email is required.";
    else {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailPattern.test(formValues.email)) {
        newErrors.email = "Please enter a valid email address.";
      }
    }

    if (!formValues.password.trim())
      newErrors.password = "Password is required.";
    else if (formValues.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await HTTP("/users", {
        method: "POST",
        body: JSON.stringify(formValues),
      });

      if (response.error) {
        throw new Error(response.error);
      } else {
        showToast("Account created successfully!", "success");
        navigate("/signin");
      }
    } catch (error) {
      showToast(error.message, "error");
      setErrors({ api: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-96 ">
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>

      {errors.api && (
        <p className="text-red-500 text-xs text-center mb-4">{errors.api}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label htmlFor="name" className="block font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formValues.name}
            onChange={handleChange}
            className="w-full p-2.5 text-white rounded-lg bg-neutral outline-none focus:ring-2 focus:ring-neutral-content"
            placeholder="Full Name"
            required
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
            className="w-full p-2.5 text-white rounded-lg bg-neutral outline-none focus:ring-2 focus:ring-neutral-content"
            placeholder="example@example.com"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="block font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formValues.password}
            onChange={handleChange}
            className="w-full p-2.5 text-white rounded-lg bg-neutral outline-none focus:ring-2 focus:ring-neutral-content"
            placeholder="Password"
            required
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg bg-opacity-75 hover:bg-opacity-100"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      <p className="text-center mt-4 text-sm">
        Already have an account?{" "}
        <Link to="/signin" className="text-primary">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
