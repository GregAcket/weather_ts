import { styled } from "styled-components";
import { Coordinates, Weather } from "../models/types";
import { Forecast } from "./Weather";

type Currentweather = {
  weather: Weather;
  coord: Coordinates;
  forecast: Forecast[];
};

const StyledArticle = styled.article`
  margin-left: 10px;
`;

export default function Currentweather({
  weather,
  coord,
  forecast,
}: Currentweather) {
  console.log(weather);

  let actualWeather = forecast.filter(
    (actual) => actual.value === weather.current_weather.weathercode
  );
  console.log(actualWeather);

  return (
    <>
      <StyledArticle>
        <p>Actuellement, à {coord.ville} :</p>
        <p>il fait {weather?.current_weather?.temperature}ºC</p>
        <p>
          {actualWeather[0]?.emote} {actualWeather[0]?.description}
        </p>
      </StyledArticle>
    </>
  );
}
