import { useEffect, useState } from "react";
import WeatherApi from "../types/WeatherApi";
import { Link, useParams } from "react-router-dom";
import cloud_icon from "../images/cloud_icon.png";
import "../SCSS/LocationPage.scss";
import MyMapComponent from "../components/MapComponent";
import { convertNameToCoord } from "../dataOperations";
import { getWeatherDataName } from "../dataOperations";
import "leaflet/dist/leaflet.css";
import "maplibre-gl/dist/maplibre-gl.css";
import sunIcon from "../images/sun.png";
import TempType from "../types/TempType";
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" />;

export interface LocationPageProps {
  tempType: TempType;
}

const LocationPage: React.FC<LocationPageProps> = ({ tempType }) => {
  const [weatherData, setWeatherData] = useState<WeatherApi | undefined>(undefined);
  const [coord, setCoord] = useState<[number, number]>([0, 0]);
  const [loading, setLoading] = useState<boolean>(true);
  let { cityName } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let newCoordData: [number, number] = coord;
      const coordData = await convertNameToCoord(cityName || "");
      newCoordData[0] = coordData?.lat || 0;
      newCoordData[1] = coordData?.lon || 0;
      setCoord(newCoordData);
      const weatherResponse = await getWeatherDataName(cityName || "", tempType);
      setWeatherData(weatherResponse);
      setLoading(false);
    } catch (error) {
      window.alert("Error occurred, Please try again");
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="full_container">
        {/* <TempForm register={} setValue={} tempType={} setTempType={}></TempForm> */}
        <div className="top_bar">
          <Link to="/">
            <img className="cloud_image" src={cloud_icon} alt="logo" />
          </Link>
        </div>
        <div>
          {weatherData ? <h1>{weatherData.name}</h1> : <div>Error, cannot fetch data</div>}
          <p>
            Temperature in {weatherData?.name} is: {weatherData?.main.temp} degrees{" "}
          </p>
          <p>Feels like: {weatherData?.main.feels_like}</p>
          <p>
            The maximum temperature today in {weatherData?.name} will be: {weatherData?.main.temp_max}
          </p>
        </div>
        <div className="map_div">
          {coord[0] !== 0 && coord[1] !== 0 ? <MyMapComponent lat={coord[0]} lon={coord[1]} /> : <p>Loading map...</p>}
        </div>
      </div>
    );
  }
};

export default LocationPage;
