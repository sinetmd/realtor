import React from "react";
import { Outlet, Navigate } from "react-router";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { Spinner } from "./Spinner";

export const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus(); // this is a hook
  if (checkingStatus) {
    return <Spinner />;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};
