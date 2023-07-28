import { Weather } from "../models/types";

export type ForecastProps = {
  weather: Weather;
};

export default function Forecast({ weather }: ForecastProps) {
  const isDay = weather.hourly.is_day;

  //console.log(weather);

  return <></>;
}
