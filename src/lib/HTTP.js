const HTTP = async (endpoint, options = {}) => {
  const url = `http://localhost:3001/api${endpoint}`;

  const token = localStorage.getItem("token");

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  const finalOptions = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, finalOptions);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API request failed", error);
    throw error;
  }
};

export default HTTP;
