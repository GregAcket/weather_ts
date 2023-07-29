import { Dispatch, SetStateAction } from "react";
import { Basic } from "unsplash-js/dist/methods/photos/types";

export type Coordinates = {
  ville: string;
  latitude: number;
  longitude: number;
  checkWeather: boolean;
};

export type City = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country_code: string;
  admin1: string;
};

export type StyledProps = {
  $isDarkMode: boolean;
};

export type StyledForecastProps = {
  $isDarkMode: boolean;
  $isActive: boolean;
};

export type Weather = {
  hourly: {
    temperature_2m: number[];
    time: string[];
    is_day: number[];
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
  };
  current_weather: {
    temperature: number;
    weathercode: number;
  };
};

export type ResearchBarProps = {
  city: string;
  setCity: Dispatch<SetStateAction<string>>;
  foundCity: City[];
  setFoundCity: Dispatch<SetStateAction<City[]>>;
  setPicture: Dispatch<SetStateAction<Basic[]>>;
  setCoord: Dispatch<SetStateAction<Coordinates>>;
};
