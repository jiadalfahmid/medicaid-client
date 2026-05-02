import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useSeller from "../hooks/useSeller";
import MedLoader from "../Components/MedLoader/MedLoader";

const SellerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isSeller, isSellerLoading] = useSeller();
  const location = useLocation();

  if (loading || isSellerLoading) {
    return <MedLoader />;
  }

  if (user && isSeller) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;
