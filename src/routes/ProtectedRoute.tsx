import React from "react";
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import  useAuthStore  from '../store/authStore';

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { token } = useAuthStore();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;