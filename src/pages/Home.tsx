import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className="text-3xl font-bold mb-6">Bienvenido a la Administración de Hoteles</h1>
      <nav className="space-x-4">
        <Link to="/hotels" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Gestión de Hoteles</Link>
        <Link to="/reservations" className="px-4 py-2 bg-green-500 text-white rounded-lg">Ver Reservas</Link>
      </nav>
    </div>
  );
};

export default Home;
