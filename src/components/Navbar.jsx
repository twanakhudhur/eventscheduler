import { Link } from 'react-router-dom';

export const Navbar = () => (
  <nav className="bg-gray-800 p-4">
    <div className="container mx-auto flex justify-between items-center">
      {/* Logo or Brand Name */}
      <Link to="/" className="text-white text-2xl font-bold">
        Event Manager
      </Link>

      {/* Navigation Links */}
      <div className="space-x-4">
        <Link to="/" className="text-white hover:text-gray-400">
          Home
        </Link>
        <Link to="/signup" className="text-white hover:text-gray-400">
          Sign Up
        </Link>
        <Link to="/signin" className="text-white hover:text-gray-400">
          Sign In
        </Link>
        <Link to="/create-event" className="text-white hover:text-gray-400">
          Create Event
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
