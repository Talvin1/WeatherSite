import { useEffect, useState } from "react";
import WeatherApi from "../types/WeatherApi";
import { Link, useParams } from "react-router-dom";
import cloud_icon from "../images/cloud_icon.png";
import "./LocationPage.css";
import MyMapComponent from "../components/MapComponent";
import { convertNameToCoord } from "../dataOperations";
import { getWeatherData } from "../dataOperations";

const LocationPage = () => {
  const [weatherData, setWeatherData] = useState<WeatherApi | undefined>(undefined);
  const [coord, setCoord] = useState<[number, number]>([0, 0]);
  const [loading, setLoading] = useState<boolean>(true);
  let { cityName } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const coordData = await convertNameToCoord(cityName || "");
      setCoord((coordinates) => [coordData?.lat || 0, coordData?.lon || 0]);
      const weatherResponse = await getWeatherData(cityName || "");
      setWeatherData(weatherResponse);
      setLoading(false);
    } catch (error) {
      window.alert("Error accured, Please try again");
    }
  };

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
