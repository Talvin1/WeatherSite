// import React, { useContext } from "react";
// import { TempType } from "./App";
import { useNavigate } from "react-router";
import "./HomePage.css";
import { ChangeEvent, KeyboardEventHandler, useState } from "react";
import { cityNameProp } from "../types/Props";


const Homepage = (props : cityNameProp) => {
  //   const tempType = useContext();
  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.setCityName(event.target.value);
  };


  const searchLocation: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      localStorage.setItem("cityName",props.cityName)
      navigate("/location");
    }
  };
  const header = () => {
    return (
      //   <TempType.Consumer>
      <div className="header_div">
        <h1>MEZEG</h1>
        <label>
          Temperature:
          <select name="selectedFruit">
            <option value="C">C°</option>
            <option value="F">F°</option>
          </select>
        </label>
        <input
          className="searchbar"
          type={"text"}
          autoFocus={true}
          placeholder={"Enter city name"}
          onKeyDown={searchLocation}
          onChange={handleInputChange}
        />
      </div>
      //   </TempType.Consumer>
    );
  };
  return (
    // <TempType.Consumer>
    <div>{header()}</div>
    // </TempType.Consumer>
  );
};

export default Homepage;
