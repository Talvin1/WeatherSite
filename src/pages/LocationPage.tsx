import { useEffect, useState } from "react";
import axios from "axios";
import WeatherApi from "../types/WeatherApi";
import { Link, useParams } from "react-router-dom";
import cloud_icon from "../images/cloud_icon.png";
import "./LocationPage.css";
import MyMapComponent from "../components/MapComponent";
import CoordApi from "../types/CoordApi";

const LocationPage = () => {
  const [weatherData, setWeatherData] = useState<WeatherApi | undefined>(undefined);
  const [coord, setCoord] = useState<[number, number]>([0, 0]);
  const [loading, setLoading] = useState<boolean>(true);
  const tempType = localStorage.getItem("tempType") ?? "metric";
  const { cityName } = useParams();

  //Move to another file
  const getWeatherData = async () => {
    try {
      const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherApiKey}&units=${tempType}`;
      const res = await axios.get<WeatherApi>(url);
      return res.data;
    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  };

  const convertNameToCoord = async (name: string) => {
    if (name === "") {
      console.log("Coordinates Were Not loaded Correctly");
    } else {
      try {
        const coordApiKey = process.env.REACT_APP_AZURE_MAPS_API_KEY;
        const url = `https://atlas.microsoft.com/search/fuzzy/json?&api-version=1.0&subscription-key=${coordApiKey}&language=en-US&query=${cityName}`;
        const response = await axios.get<CoordApi>(url);
        const coordData = response.data;
        if (coordData.results && coordData.results.length > 0) {
          const lat = coordData.results[0].position.lat;
          const lon = coordData.results[0].position.lon;
          setCoord([lat, lon]);
        } else {
          console.log("Coordinates not found");
        }
      } catch (error) {
        console.log("Coordinates Request Error");
      }
    }
  };

  //Move to another file
  const fetchData = async () => {
    try {
      const weatherResponse = await getWeatherData();
      setWeatherData(weatherResponse);
      await convertNameToCoord(cityName || "");
      setLoading(false);
    } catch (error) {
      window.alert("Error accured, Please try again");
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
          <MyMapComponent lat={coord?.[0] || 0} lon={coord?.[1] || 0} />
        </div>
      </div>
    );
  }
};

export default LocationPage;
