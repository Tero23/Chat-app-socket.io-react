import { Navigate, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import { useContext } from "react";
import { SignInContext } from "./SignInContext";

const ProtectedRoutes = () => {
  const { isLoggedIn } = useContext(SignInContext);
  return isLoggedIn ? <Outlet /> : <Navigate to={<Login />} />;
};

export default ProtectedRoutes;
