import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAllowed, children }) => {
  return isAllowed ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
