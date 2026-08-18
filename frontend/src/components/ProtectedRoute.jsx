import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {

    // Read token
    const token = localStorage.getItem("token");

    // Not logged in
    if (!token) {
        return <Navigate to="/" replace />;
    }

    // If no role restriction is given,
    // any logged-in user can access the page
    if (!allowedRoles || allowedRoles.length === 0) {
        return children;
    }

    // Read logged-in user's role
    const role = localStorage.getItem("role");

    // User does not have required role
    if (!allowedRoles.includes(role)) {
        return <Navigate to="/dashboard" replace />;
    }

    // Correct role
    return children;
}

export default ProtectedRoute;
