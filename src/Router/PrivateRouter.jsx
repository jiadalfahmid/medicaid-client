import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";

const PrivateRouter = ({ children }) => {
  const { user } = UseAuth();
  const location = useLocation();

  if (user) {
    return children; 
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRouter;