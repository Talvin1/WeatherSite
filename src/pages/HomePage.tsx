import "../SCSS/HomePage.scss";
import { useForm } from "react-hook-form";
import "../images/search.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CenterHomepage from "../components/CenterHomepage";

type TempType = "metric" | "kelvin" | "imperial";
type SearchData = { tempType: TempType; cityName: string };

const Homepage = () => {
  const { register, watch } = useForm<SearchData>({
    defaultValues: {
      tempType: "metric",
      cityName: "",
    },
  });

  let tempSign = "";
  if (watch("tempType") === "metric") {
    tempSign = "°C";
  } else {
    if (watch("tempType") === "imperial") {
      tempSign = "°F";
    } else {
      tempSign = "°K";
    }
  }

  const localStorageSearchHistory = localStorage.getItem("searchHistory") ?? "[]";
  const searchHistory = JSON.parse(localStorageSearchHistory);

  const TempForm = () => {
    return (
      <label className="form_label">
        Temperature Unit:
        <select {...register("tempType")} className="temp_select">
          <option className="tempOption" value="metric">
            °C
          </option>
          <option className="tempOption" value="imperial">
            °F
          </option>
          <option className="tempOption" value="kelvin">
            °K
          </option>
        </select>
      </label>
    );
  };

  const RecentSearches = () => {
    return (
      <div className="recent_search_div">
        <ul>
          <h4>Recently Searched:</h4>
          {searchHistory.map((search: string) => (
            <motion.li key={Math.random()} whileHover={{ scale: 1.07 }}>
              <Link to={"/location/" + search}>
                {(search[0].toUpperCase() + search.slice(1)).length > 11
                  ? tempSign + " " + (search[0].toUpperCase() + search.slice(1)).substring(0, 15)
                  : tempSign + " " + search[0].toUpperCase() + search.slice(1)}{" "}
              </Link>
            </motion.li>
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
        <CenterHomepage tempType={watch("tempType")} />
        <div className="recent_search_div">
          <RecentSearches />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
