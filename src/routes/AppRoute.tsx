import React from "react";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import LogoutButton from "../components/LogoutButton";


const Login = lazy(() => import("../pages/Login"));
const HotelSearch = lazy(() => import("../pages/HotelSearch"));
const HotelManagement = lazy(() => import("../pages/HotelManagement"));
const Reservations = lazy(() => import("../pages/Reservations"));
const HotelDetails = lazy(() => import("../pages/HotelDetails"));
const ReservationForm = lazy(() => import("../pages/ReservationForm"));
const Home = lazy(() => import("../pages/Home"));


const AppRouter = () => {

  return (
    <Router>
      <LogoutButton />
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>

          <Route path="/" element={<HotelSearch />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
           <Route
            path="/hotels"
            element={
              <ProtectedRoute>
                <HotelManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reservations"
            element={
              <ProtectedRoute>
                <Reservations />
              </ProtectedRoute>
            }
          />

   
          <Route path="/login" element={<Login />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/reservations/:hotelId/:roomId" element={<ReservationForm />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;