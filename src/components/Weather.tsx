import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  TooltipProps,
} from "recharts";
import { Coordinates } from "../models/types";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

type Props = {
  coord: Coordinates;
};

type Weather = {
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
  current_weather: {
    temperature: number;
  };
};

export default function Weather({ coord }: Props) {
  const [weather, setWeather] = useState<Weather>({
    hourly: {
      time: [""],
      temperature_2m: [0],
    },
    current_weather: {
      temperature: 0,
    },
  });

  const latitude = coord.latitude.toString();
  const longitude = coord.longitude.toString();

  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=" +
    latitude +
    "&longitude=" +
    longitude +
    "&hourly=temperature_2m,weathercode&current_weather=true";

  useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        const response = await fetch(url);
        const responseJson = await response.json();
        setWeather(responseJson);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [url]);

  // console.log(weather);

  const dates = [];

  for (let i = 0; i < weather?.hourly.time.length; i++) {
    dates.push(new Date(weather.hourly.time[i]));
  }

  const hours = dates.map((hour) => {
    return hour.getHours();
  });

  const formatDates = dates.map((day) => {
    return day.toLocaleDateString("fr-FR");
  });

  const datas = [];

  for (let i = 0; i < weather.hourly.temperature_2m.length; i++) {
    datas.push({
      id: i,
      name: formatDates[i],
      temperatures: weather.hourly.temperature_2m[i],
      heure: hours[i],
    });
  }

  function CustomTooltip({
    active,
    label,
    payload,
  }: TooltipProps<ValueType, NameType>) {
    if (active && payload !== undefined) {
      return (
        <>
          <div>
            <p>{label}</p>
            <p>{payload[0].payload.heure}h00</p>
            <p>{payload[0].value}ºC</p>
          </div>
        </>
      );
    }
  }

  return (
    <>
      <p>
        Actuellement, à {coord.ville} il fait{" "}
        {weather?.current_weather?.temperature}ºC
      </p>

      <LineChart
        width={700}
        height={300}
        data={datas}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type="monotone" dataKey="temperatures" stroke="#8884d8" />
      </LineChart>
    </>
  );
}
