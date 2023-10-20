import { useNavigate } from "react-router";
import "./HomePage.css";
import { useForm } from "react-hook-form";
import "../images/search.png";
import { Link } from "react-router-dom";
import "maplibre-gl/dist/maplibre-gl.css";
import { getWeatherData } from "../dataOperations";

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

  const localStorageSearchHistory = localStorage.getItem("searchHistory") ?? "[]";
  const searchHistory = JSON.parse(localStorageSearchHistory);
  const cityName = localStorage.getItem("cityName");

  if (!cityName) {
    navigate("/");
  }

  const searchLocation = async (data: SearchData) => {
    if (data.cityName) {
      searchHistory.unshift(data.cityName);
      if (searchHistory.length > 5) {
        searchHistory.pop();
      }
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
      localStorage.setItem("cityName", data.cityName);
      localStorage.setItem("tempType", data.tempType);
      console.log(getWeatherData(data.cityName));

      if ((await getWeatherData(data.cityName)) != null) {
        navigate("/location/" + data.cityName);
      } else {
      }
    }
  };

  const Main = () => {
    return (
      <div className="header_div">
        <form className="form" onSubmit={handleSubmit(searchLocation)}>
          <input
            {...register("cityName")}
            className="searchbar"
            type={"text"}
            autoFocus={true}
            placeholder={"Enter place name"}
          />
          <input className="search_btn" type="submit" value="Search" />
        </form>
      </div>
    );
  };

  const RecentSearches = () => {
    return (
      <div className="recent_search_div">
        <ul>
          <h4>Recently Searched:</h4>
          {searchHistory.map((search: string) => (
            <li>
              <Link to={"/location/" + search}>
                {(search[0].toUpperCase() + search.slice(1)).length > 11
                  ? (search[0].toUpperCase() + search.slice(1)).substring(0, 11)
                  : search[0].toUpperCase() + search.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  return (
    <div className="page_div">
      <div className="top_bar">
        <label className="form_label">
          Temperature Unit:
          <select {...register("tempType")} className="temp_select">
            <option value="metric">C°</option>
            <option value="imperial">°F</option>
            <option value="kelvin">°K</option>
          </select>
        </label>
        <h1 className="title">MEZEG</h1>
      </div>
      <div className="header_div">
        <Main />
        <div className="recent_search_div">
          <RecentSearches />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
