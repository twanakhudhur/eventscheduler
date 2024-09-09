import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar'; 
import EventDetailsPage from './pages/EventDetailsPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import CreateEventPage from './pages/CreateEventPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
       {/* Navbar will be displayed on all pages */}
       <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events/:id" element={<EventDetailsPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/create-event" element={
          <ProtectedRoute>
            <CreateEventPage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
