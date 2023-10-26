import "../images/search.png";
import { motion } from "framer-motion";
import { getCurrentLocation, getWeatherDataName } from "../dataOperations";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

type TempType = "metric" | "kelvin" | "imperial";
type SearchData = { tempType: TempType; cityName: string };
type CenterHomepageProps = {
  tempType: TempType;
};

const CenterHomepage: React.FC<CenterHomepageProps> = ({ tempType: tempTypeProp }) => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<SearchData>({
    defaultValues: {
      tempType: tempTypeProp,
      cityName: "",
    },
  });
  const localStorageSearchHistory = localStorage.getItem("searchHistory") ?? "[]";
  const searchHistory = JSON.parse(localStorageSearchHistory);
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
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        localStorage.setItem("cityName", data.cityName);
        localStorage.setItem("tempType", tempTypeProp);
        navigate("/location/" + data.cityName);
      }
    } catch (error) {
      if (data.cityName === "") {
        Swal.fire({
          title: "No input was entered...",
          text: "Please enter a place",
          icon: "error",
          confirmButtonText: "Ok",
          timer: 5000,
          confirmButtonColor: "#b5b0ab",
          customClass: "swal_popup",
        });
      } else {
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
      localStorage.setItem("tempType", tempTypeProp);
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

  return (
    <div className="header_div">
      <form className="form" onSubmit={handleSubmit(searchLocation)}>
        <input
          {...register("cityName")}
          className="searchbar"
          type="text"
          autoFocus={true}
          placeholder={"Enter place name"}
        />
        <motion.input className="search_btn" whileHover={{ scale: 1.03 }} type="submit" value="Search" />
        <motion.input
          className="search_btn"
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.03 }}
          type="button"
          onClick={() => searchMyLocation()}
          value="Search my location"
        />{" "}
      </form>
    </div>
  );
};

export default CenterHomepage;
