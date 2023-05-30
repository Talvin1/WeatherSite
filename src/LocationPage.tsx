import React, { ChangeEvent, KeyboardEventHandler, useEffect, useState } from "react";
import axios from "axios";
import { RootObject } from "./types/WeatherApi";
import { cityNameProp } from './types/Props'

const LocationPage = (props: cityNameProp) => {
  const storedCityName: string|null = localStorage.getItem("cityName") ?? '';
  const cityName: string = props.cityName === '' ? storedCityName :  props.cityName;
  const [weatherData, setWeatherData] = useState<RootObject | undefined>();
  const [newSearch, setNewSearch] = useState(0)
  console.log(weatherData ? weatherData.list : "אין מידע");
  console.log(localStorage.getItem("cityName"))

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.setCityName(event.target.value);
  };

  const searchLocation: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      const event: ChangeEvent<HTMLInputElement> = e as unknown as ChangeEvent<HTMLInputElement>;
      handleInputChange(event);
      setNewSearch(newSearch + 1);
    }
  };
  

  useEffect(() => {
    async function fetchData() {
      const wr = await getWeatherData();
      setWeatherData(wr);
    }

    fetchData();
  }, [newSearch]);

  const getWeatherData = async () => {
    try { 
      const url =
      "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=e58a8b2d3a37b9e6bd3507aa9de5ea2e"
      const res = await axios.get<RootObject>(url);
      return res.data;
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const capitalizeFirstWords = (input: string) => {
    const words = input.split(' ');
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(' ');
  };

  return <div>
    <h1>{ capitalizeFirstWords(cityName) + "'s forecast"}</h1>
    {weatherData ? weatherData.list[0].weather[0].description : "אין מידע"}
    <input
          className="searchbar"
          type={"text"}
          autoFocus={true}
          placeholder={"Enter city name"}
          onKeyDown={searchLocation}
        />
    </div>;
};

export default LocationPage;
