import axios from "axios";
import WeatherApi from "./types/WeatherApi";
import WeatherCoordApi from "./types/WeatherCoordApi";
import CoordApi from "./types/CoordApi";
import LocationApi from "./types/LocationApi";

const getWeatherDataName = async (PlaceName: string) => {
  const tempType = localStorage.getItem("tempType") ?? "metric";
  try {
    const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${PlaceName}&appid=${weatherApiKey}&units=${tempType}`;
    let res = await axios.get<WeatherApi>(url);
    return res.data;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};

const getWeatherDataCoord = async (lat: number, lon: number) => {
  const tempType = localStorage.getItem("tempType") ?? "metric";
  try {
    const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=${tempType}`;
    let res = await axios.get<WeatherCoordApi>(url);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};

const convertNameToCoord = async (cityName: string) => {
  if (cityName === "") {
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
        return {
          lat: lat,
          lon: lon,
          municipality: coordData.results[0].address.municipality,
        };
      } else {
        console.log("Coordinates not found");
      }
    } catch (error) {
      console.log("Coordinates Request Error");
    }
  }
};

const getCurrentLocation = async () => {
  let lat: number = 0;
  let lon: number = 0;
  try {
    const locationApi = process.env.REACT_APP_LOCATION_API_KEY;
    let url = `https://api.geoapify.com/v1/ipinfo?apiKey=${locationApi}`;
    const locationResponse = await axios.get<LocationApi>(url);
    lat = locationResponse.data.location.latitude;
    lon = locationResponse.data.location.longitude;
    return getWeatherDataCoord(lat, lon);
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};

export { convertNameToCoord, getWeatherDataCoord, getWeatherDataName, getCurrentLocation };
