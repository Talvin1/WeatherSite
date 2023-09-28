import { useNavigate } from "react-router";
import "./HomePage.css";
import { useForm } from "react-hook-form";
import "../images/search.png";
import { Link } from "react-router-dom";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

type TempType = "metric" | "kelvin" | "imperial";
type SearchData = { tempType: TempType; cityName: string };

const Homepage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<SearchData>({
    defaultValues: {
      tempType: "metric",
      cityName: "",
    },
  });

  const [coord, setCoord] = useState();
  const localStorageSearchHistory = localStorage.getItem("searchHistory") ?? "[]";
  const searchHistory = JSON.parse(localStorageSearchHistory);

  const cityName = localStorage.getItem("cityName");

  if (!cityName) {
    navigate("/");
  }

  const searchLocation = (data: SearchData) => {
    if (data.cityName) {
      localStorage.setItem("cityName", data.cityName);
      const updatedSearchHistory = new Set([...searchHistory, data.cityName]);
      localStorage.setItem("searchHistory", JSON.stringify([...updatedSearchHistory]));
      localStorage.setItem("tempType", data.tempType);
      navigate("/location/" + data.cityName);
    }
  };

  const Header = () => {
    return (
      <div className="header_div">
        <h1>MEZEG</h1>
        <form onSubmit={handleSubmit(searchLocation)}>
          <label>
            Temperature:
            <select {...register("tempType")}>
              <option value="metric">C°</option>
              <option value="imperial">°F</option>
              <option value="kelvin">°K</option>
            </select>
          </label>
          <input
            {...register("cityName")}
            className="searchbar"
            type={"text"}
            autoFocus={true}
            placeholder={"Enter city name"}
          />
          <input type="submit" />
        </form>
      </div>
    );
  };

  const RecentSearches = () => {
    return (
      <div className="recent_searches_div">
        <ul>
          {searchHistory.map((search: string) => (
            <li>
              <Link to={"/location/" + search}>{search[0].toUpperCase() + search.slice(1)}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  return (
    <div>
      <Header />
      <RecentSearches />
      <MapContainer center={[48.8566, 2.3522]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default Homepage;
