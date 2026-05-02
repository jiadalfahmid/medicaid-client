import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";
import MedLoader from "../Components/MedLoader/MedLoader";

const PrivateRouter = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();

  if (loading) {
    return <MedLoader />;
  }

  if (user) {
    return children; 
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRouter;