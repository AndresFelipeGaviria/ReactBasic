import React from "react";
import AppRouter from "./routes/AppRoute";
import Loading from "./components/ui/Loading";

function App() {
  return (
    <div className="min-h-screen">
      <Loading />
      <AppRouter />
    </div>
  );
}

export default App;
