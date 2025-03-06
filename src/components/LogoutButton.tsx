import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const LogoutButton = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuthStore();

    const adminRoutes = ['/hotels', '/reservations', '/home'];
    if (!adminRoutes.includes(location.pathname)) return null;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <button
            onClick={handleLogout}
            className="fixed top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
        >
            Cerrar Sesión
        </button>
    );
};

export default LogoutButton;