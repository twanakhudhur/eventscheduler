import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import EventDetailsPage from "./Pages/EventDetailsPage";
import HomePage from "./Pages/HomePage";
import SignUpPage from "./Pages/SignUpPage";
import SignInPage from "./Pages/SignInPage";
import CreateEventPage from "./Pages/CreateEventPage";
import ProtectedRoute from "./layouts/ProtectedRoute";
import UpcomingPage from "./Pages/UpcomingPage";
import ProfilePage from "./Pages/ProfilePage";
import UpdateEventPage from "./Pages/UpdateEventPage";
import { ErrorBoundary } from 'react-error-boundary';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/upcoming",
          element: <UpcomingPage />,
        },
        {
          path: "/events/:id",
          element: <EventDetailsPage />,
        },
        {
          path: "/signin",
          element: <SignInPage />,
        },
        {
          path: "/signup",
          element: <SignUpPage />,
        },
        {
          path: "/",
          element: <ProtectedRoute />,
          children: [
            {
              path: "/create-event",
              element: <CreateEventPage />,
            },
            {
              path: "/profile",
              element: <ProfilePage />,
            },
            {
              path: "/update-event/:eventId",
              element: <UpdateEventPage />,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);

  return (
    <ErrorBoundary fallback={<div>Something went wrong!</div>}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
