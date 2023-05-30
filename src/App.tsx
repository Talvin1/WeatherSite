import React, { HTMLInputTypeAttribute, useState } from "react";
import LocationPage from "./LocationPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/HomePage";
import "./App.css";

export const TempType = React.createContext("C");

const App = () => {
  const [temp, setTemp] = useState("C");
  const [cityName, setCityName] = useState("");
  console.log(cityName)

  return (
    <TempType.Provider value={temp}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage cityName={cityName} setCityName={setCityName}/>}></Route>
          <Route path="/location" element={<LocationPage cityName={cityName} setCityName={setCityName}/>}></Route>
        </Routes>
      </BrowserRouter>
    </TempType.Provider>
  );
};

export default App;
