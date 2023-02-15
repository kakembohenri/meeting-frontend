import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../services/authSlice";
import Dashboard from "../Pages/Dashboard";

const RequireNoAuth = () => {
    const isLoggedIn = useSelector(selectToken);
  const location = window.location.pathname;


  if (!isLoggedIn) {
    return <Outlet />
  }

  if(isLoggedIn) return <Navigate to="/dashboard" element={<Dashboard />} />

  return <Outlet />; 
  }
export default RequireNoAuth