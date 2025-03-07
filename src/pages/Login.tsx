import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore  from "../store/authStore";

const Login = () => {

  const { login, token } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      await login(email, password);
      if(localStorage.getItem("token")) navigate("/home");
  };


  useEffect(() => {
    if (token) {
      return navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h2>
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-medium shadow-md hover:shadow-lg"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
