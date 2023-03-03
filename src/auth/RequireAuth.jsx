import { useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../services/authSlice";

const RequireAuth = () => {
  const location = useLocation();
  const isLoggedIn = useSelector(selectToken);

  if (!isLoggedIn) {
    return window.location.assign(`#/login?redirect=${location.pathname}`);
  }

  return <Outlet />;
};

export default RequireAuth;
