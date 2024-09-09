import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes

const ProtectedRoute = ({ children }) => {
  // Add prop validation for 'children'
  const token = localStorage.getItem('apiToken');  // Check token

  if (!token) {
    return <Navigate to="/signin" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Add prop validation for 'children'
};

export default ProtectedRoute;
