import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import HTTP from "../lib/HTTP";
import { useToast } from "../context/ToastContext";

const SignInPage = () => {
  const { showToast } = useToast();
  const { token, handleLogin } = useAuth();
  const navigate = useNavigate();

  if (token) {
    return <Navigate to="/" />;
  }

  const [formValues, setFormValues] = useState({ email: "", password: "" });
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

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const data = await HTTP("/auth/login", {
        method: "POST",
        body: JSON.stringify(formValues),
      });

      if (data.error) {
        throw new Error(data.error);
      }

      handleLogin(data.token, data.user);
      showToast(`Welcome ${data.user.name}`, "success");

      navigate("/");
    } catch (error) {
      showToast(error.message, "error");
      setErrors({ api: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-96">
      <h2 className="text-2xl font-bold mb-6">Sign In</h2>

      {errors.api && (
        <p className="text-red-500 text-xs text-center mb-4">{errors.api}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            className="w-full p-2.5 text-white rounded-lg bg-neutral outline-none focus:ring-2 focus:ring-neutral-content"
            placeholder="example@example.com"
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
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <p className="text-center mt-4 text-sm">
        Don't have an account?{" "}
        <Link to="/signup" className="text-primary" disabled={loading}>
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignInPage;
