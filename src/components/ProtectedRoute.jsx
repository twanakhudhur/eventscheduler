import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'; 

const ProtectedRoute = ({ children }) => {
  
  const token = localStorage.getItem('apiToken');  

  if (!token) {
    return <Navigate to="/signin" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, 
};

export default ProtectedRoute;
