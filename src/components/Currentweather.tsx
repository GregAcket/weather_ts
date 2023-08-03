import { styled } from "styled-components"
import {
  Coordinates,
  ForecastWeather,
  ForecastWind,
  Weather,
} from "../models/types"

type Currentweather = {
  weather: Weather
  coord: Coordinates
  forecast: ForecastWeather[]
  forecastWind: ForecastWind[]
}

const StyledAside = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px auto;
  min-width: 300px;
  max-width: 25%;
  @media (min-width: 768px) {
  }
`

const StyledP = styled.p`
  display: flex;
  align-items: center;
  align-self: flex-start;
  margin: 5px 0px;
`

export default function Currentweather({
  weather,
  coord,
  forecast,
  forecastWind,
}: Currentweather) {
  let actualWeather = forecast.find(
    (actual) => actual.value === weather.current_weather.weathercode
  )

  const windDirection = (datas: Weather, arr1: ForecastWind[]) => {
    let filtered = arr1.find(
      (direction) =>
        direction.min < datas.current_weather.winddirection &&
        direction.max > datas.current_weather.winddirection
    )
    if (filtered === undefined) {
      return arr1[0]
    } else {
      return filtered
    }
  }

  let wind = windDirection(weather, forecastWind)
  console.log(wind)

  return (
    <>
      <StyledAside>
        <StyledP>Actuellement, à {coord.ville} :</StyledP>
        <StyledP>Il fait {weather?.current_weather?.temperature}ºC</StyledP>
        <StyledP>
          {actualWeather?.description} {actualWeather?.emote}
        </StyledP>
        <StyledP>
          Vent : {wind?.emote} {wind?.value} {weather.current_weather.windspeed}{" "}
          km/h
        </StyledP>
      </StyledAside>
    </>
  )
}
