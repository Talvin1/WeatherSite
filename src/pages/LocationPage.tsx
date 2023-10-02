import { useEffect, useState } from "react";
import axios from "axios";
import WeatherApi from "../types/WeatherApi";
import { Link, useParams } from "react-router-dom";
import cloud_icon from "../images/cloud_icon.png";
import "./LocationPage.css";
import MyMapComponent from "../components/MapComponent";

const LocationPage = () => {
  const [weatherData, setWeatherData] = useState<WeatherApi | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const tempType = localStorage.getItem("tempType") ?? "metric";
  const { cityName } = useParams();

  //Move to another file
  const getWeatherData = async () => {
    try {
      const apiKey = "e58a8b2d3a37b9e6bd3507aa9de5ea2e";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${tempType}`;
      const res = await axios.get<WeatherApi>(url);
      return res.data;
    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  };

  //Move to another file
  const fetchData = async () => {
    try {
      const weatherResponse = await getWeatherData();
      setWeatherData(weatherResponse);
      setLoading(false);
    } catch (error) {
      window.alert("Location not found, Please try again");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="full_container">
        <div className="top_bar">
          <Link to="/">
            <img className="cloud_image" src={cloud_icon} alt="logo" />
          </Link>
        </div>
        <div>
          {weatherData ? <h1>{weatherData.name}</h1> : <div>Error, cannot fetch data</div>}
          <p>
            Current temperature in {weatherData?.name} is: {weatherData?.main.temp} degrees
          </p>
          <p>
            Feels like: {weatherData?.main.feels_like}, in {weatherData?.name} at the moment
          </p>
          <p>
            The maximum temperature today in {weatherData?.name} will be: {weatherData?.main.temp_max}
          </p>
        </div>
        <div className="map_div">
          <MyMapComponent />
        </div>
      </div>
    );
  }
};

export default LocationPage;
