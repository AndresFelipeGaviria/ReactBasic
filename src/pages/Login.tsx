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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded-lg"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
