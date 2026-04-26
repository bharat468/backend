import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import Spinner from "./ui/Spinner";

/**
 * Protected Route Component
 * Redirects to login if user is not authenticated
 * Preserves the intended destination for post-login redirect
 */
function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // Redirect to login with return URL if not authenticated
  if (!isLoggedIn) {
    return <Navigate to={`/login?nextPage=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // Render protected content if authenticated
  return children;
}

export default ProtectedRoute;
