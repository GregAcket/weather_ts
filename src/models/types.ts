import { Dispatch, SetStateAction } from "react"
import { Basic } from "unsplash-js/dist/methods/photos/types"

export type Coordinates = {
  ville: string
  latitude: number
  longitude: number
  checkWeather: boolean
}

export type City = {
  id: number
  name: string
  latitude: number
  longitude: number
  country_code: string
  admin1: string
}

export type StyledProps = {
  $isActive?: boolean
  $isDarkMode?: boolean
}

export type Weather = {
  hourly: {
    is_day: number[]
    time: string[]
    temperature_2m: number[]
    weathercode: number[]
    winddirection_10m: number[]
    windspeed_10m: number[]
  }
  daily: {
    time: string[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    weathercode: number[]
    winddirection_10m_dominant: number[]
    windspeed_10m_max: number[]
  }
  current_weather: {
    temperature: number
    weathercode: number
    winddirection: number
    windspeed: number
  }
}

export type ForecastWeather = {
  value: number
  description: string
  emote: JSX.Element
}

export type ForecastWind = {
  value: string
  min: number
  max: number
  emote: JSX.Element
}

export type ResearchBarProps = {
  city: string
  setCity: Dispatch<SetStateAction<string>>
  foundCity: City[]
  setFoundCity: Dispatch<SetStateAction<City[]>>
  setPicture: Dispatch<SetStateAction<Basic[]>>
  setCoord: Dispatch<SetStateAction<Coordinates>>
}
