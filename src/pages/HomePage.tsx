import { useNavigate } from "react-router";
import "./HomePage.css";
import { useForm } from "react-hook-form";
import "../images/search.png";
import { Link } from "react-router-dom";
import { getWeatherDataName, getCurrentLocation } from "../dataOperations";
import Swal from "sweetalert2";

type TempType = "metric" | "kelvin" | "imperial";
type SearchData = { tempType: TempType; cityName: string };

const Homepage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm<SearchData>({
    defaultValues: {
      tempType: "metric",
      cityName: "",
    },
  });

  const tempType = watch("tempType");

  const localStorageSearchHistory = localStorage.getItem("searchHistory") ?? "[]";
  const searchHistory = JSON.parse(localStorageSearchHistory);
  const cityName = localStorage.getItem("cityName");

  if (!cityName) {
    navigate("/");
  }

  const searchLocation = async (data: SearchData) => {
    try {
      await getWeatherDataName(data.cityName);
      if (data.cityName) {
        if (!searchHistory.includes(data.cityName)) {
          searchHistory.unshift(data.cityName);
          if (searchHistory.length > 5) {
            searchHistory.pop();
          }
        }
      }
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
      localStorage.setItem("cityName", data.cityName);
      localStorage.setItem("tempType", data.tempType);
      navigate("/location/" + data.cityName);
    } catch (error) {
      Swal.fire({
        title: data.cityName + " was not found!",
        text: "Please Try Again",
        icon: "error",
        confirmButtonText: "Ok",
        timer: 5000,
        confirmButtonColor: "#b5b0ab",
        customClass: "swal_popup",
      });
    }
  };

  const searchMyLocation = async () => {
    try {
      const data = await getCurrentLocation();
      if (data.cod === "200") {
        if (!searchHistory.includes(data.city.name)) {
          searchHistory.unshift(data.city.name);
          if (searchHistory.length > 5) {
            searchHistory.pop();
          }
        }
      }
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
      localStorage.setItem("cityName", data.city.name);
      localStorage.setItem("tempType", tempType);
      navigate("/location/" + data.city.name);
    } catch (error) {
      Swal.fire({
        title: "Your current location was not found!",
        text: "Please Try Again",
        icon: "error",
        confirmButtonText: "Ok",
        timer: 5000,
        confirmButtonColor: "#b5b0ab",
        customClass: "swal_popup",
      });
    }
  };

  const TempForm = () => {
    return (
      <label className="form_label">
        Temperature Unit:
        <select {...register("tempType")} className="temp_select">
          <option value="metric">°C</option>
          <option value="imperial">°F</option>
          <option value="kelvin">°K</option>
        </select>
      </label>
    );
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
          <input
            className="search_btn"
            type="button"
            onClick={() => searchMyLocation()}
            value="Search my location"
          />{" "}
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
        <TempForm />
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
