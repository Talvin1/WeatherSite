import axios from "axios";
import React from "react";
import WeatherApi from "./types/WeatherApi";

const dataOperations = () => {
  //   const getWeatherData = async (cityName: string) => {
  //     try {
  //       const apiKey = "e58a8b2d3a37b9e6bd3507aa9de5ea2e";
  //       const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  //       const res = await axios.get<WeatherApi>(url);
  //       return res.data;
  //     } catch (err) {
  //       console.error("Error:", err);
  //       throw err;
  //     }
  //   };
  //   return <div></div>;
};

export default dataOperations;
