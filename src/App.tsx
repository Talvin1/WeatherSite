import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/HomePage";
import LocationPage from "./pages/LocationPage";
import "./pages/App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TempType from "./types/TempType";

const App = () => {
  const queryClient = new QueryClient();
  const [tempType, setTempType] = useState<TempType>("metric");

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage tempType={tempType} setTempType={setTempType} />} />
          <Route path="/location/:cityName" element={<LocationPage tempType={tempType} />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
