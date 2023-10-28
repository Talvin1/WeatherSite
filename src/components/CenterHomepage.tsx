import "../images/search.png";
import { motion } from "framer-motion";
import { getCurrentLocation, getWeatherDataName } from "../dataOperations";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import TempType from "../types/TempType";
import { Input } from "antd";

type SearchData = { tempType: TempType; cityName: string };

export interface CenterHomepageProps {
  tempType: TempType;
}

const CenterHomepage: React.FC<CenterHomepageProps> = ({ tempType }) => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<SearchData>({
    defaultValues: {
      tempType: tempType,
      cityName: "",
    },
  });
  const localStorageSearchHistory = localStorage.getItem("searchHistory") ?? "[]";
  const searchHistory = JSON.parse(localStorageSearchHistory);

  const searchLocation = async (data: SearchData) => {
    try {
      await getWeatherDataName(data.cityName, tempType);
      if (data.cityName) {
        if (!searchHistory.includes(data.cityName)) {
          searchHistory.unshift(data.cityName);
          if (searchHistory.length > 5) {
            searchHistory.pop();
          }
        }
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
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
      const data = await getCurrentLocation(tempType);
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
        <Input
          {...register("cityName")}
          className="searchbar"
          type="text"
          autoFocus={true}
          placeholder={"Enter place name"}
        />
        <Input className="search_btn" type="submit" value="Search" />
        <Input
          className="search_btn"
          type="button"
          onClick={() => searchMyLocation()}
          value="Search my location"
        />{" "}
      </form>
    </div>
  );
};

export default CenterHomepage;
