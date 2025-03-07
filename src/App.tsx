import React from "react";
import AppRouter from "./routes/AppRoute";
import Loading from "./components/ui/Loading";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="relative z-10">
        <Loading />
        <AppRouter />
      </div>
    </div>
  );
}

export default App;
