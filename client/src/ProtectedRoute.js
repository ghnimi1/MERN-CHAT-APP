import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component }) => {
    const authenticated = localStorage.getItem('token')

    if (authenticated) {
        return component;
    }
    return <Navigate to="/signin" />
}

export default ProtectedRoute;