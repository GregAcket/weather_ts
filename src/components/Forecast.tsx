import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  TooltipProps,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { Data, Forecast } from "./Weather";
import { styled } from "styled-components";
import { StyledForecastProps, StyledProps, Weather } from "../models/types";
import { useContext, useState } from "react";
import { ThemeContext } from "../utils/context/ThemeProvider";

type ForecastProps = {
  datas: Data[];
  formatDatesDaily: string[];
  weather: Weather;
  datesDaily: Date[];
  forecast: Forecast[];
  datasHourly: Data[];
};

const StyledSection = styled.section<StyledProps>`
  max-width: 70%;
  width: 100%;
  padding-left: 20px;
  border-left: 1px solid
    ${({ $isDarkMode }) => ($isDarkMode ? "white" : "black")};
`;

const StyledDiv = styled.div`
  display: flex;
  border: 1px solid;
  border-radius: 5px;
  padding: 20px 0px;
  justify-content: space-around;
  align-items: center;
`;

const StyledNav = styled.nav``;

const StyledNavUl = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 10px;
`;

const StyledNavLi = styled.li<StyledForecastProps>`
  display: flex;
  justify-content: center;
  border-radius: 5px;
  border: ${({ $isActive }) => ($isActive ? "1px solid" : "")};
  list-style: none;
  width: 50%;
  cursor: pointer;
`;

const StyledUl = styled.ul`
  padding-left: 10px;
`;

const StyledLi = styled.li`
  list-style: none;
`;

export default function Forecast({
  weather,
  datas,
  formatDatesDaily,
  datesDaily,
  forecast,
  datasHourly,
}: ForecastProps) {
  const [isActive, setIsActive] = useState("tab1");
  const { theme } = useContext(ThemeContext);

  const hourlyData = datasHourly.slice(0, 24).map((hour) => {
    const hourToString = { ...hour, heure: hour.heure?.toString() };
    return hourToString;
  });

  console.log(datas);

  function handleChangeActiveTab() {
    isActive === "tab1" ? setIsActive("tab2") : setIsActive("tab1");
  }

  function GlobalForecast() {
    let day = datesDaily.map((day) => {
      return day.getDay();
    });

    const week = [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ];

    const replace = (arr1: number[], arr2: Forecast[]) => {
      const temps = arr1.map((code: number) => {
        const match = arr2.find((logo: Forecast) => code === logo.value);
        if (match !== undefined) {
          return match.emote;
        } else {
          return code;
        }
      });
      return temps;
    };

    let emote = replace(weather.daily.weathercode, forecast);

    const jours = [];

    for (let i = 0; i < week.length; i++) {
      let semaine = (
        <StyledLi key={i}>
          <p>
            {week[day[i]]} : {emote[i]}
          </p>
        </StyledLi>
      );
      jours.push(semaine);
    }

    return <>{jours}</>;
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
      <StyledSection $isDarkMode={theme === "dark"}>
        <p>Vos prévisions pour :</p>

        <StyledNav>
          <StyledNavUl>
            <StyledNavLi
              $isActive={isActive === "tab1"}
              $isDarkMode={theme === "dark"}
              onClick={handleChangeActiveTab}
            >
              Aujourd'hui
            </StyledNavLi>
            <StyledNavLi
              $isActive={isActive === "tab2"}
              $isDarkMode={theme === "dark"}
              onClick={handleChangeActiveTab}
            >
              Cette semaine
            </StyledNavLi>
          </StyledNavUl>
          <StyledDiv>
            <StyledUl>
              <GlobalForecast />
            </StyledUl>

            <LineChart
              width={700}
              height={350}
              data={isActive === "tab1" ? hourlyData : datas}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              {/*

pas besoin de passer heure en string XAxis accepte des number

Ne fonctionne pas

<XAxis/>

<XAxis dataKey="heure" ticks={formatDatesDaily} />

*/}

              <XAxis dataKey="date" ticks={formatDatesDaily} />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" />
              <Line
                type="monotone"
                dataKey="Temperatures"
                stroke="#0f0"
                dot={false}
              />

              {isActive === "tab2" && (
                <>
                  <Line
                    connectNulls
                    type="monotone"
                    dataKey="Temperatures_max"
                    stroke="#f00"
                    dot={true}
                  />
                  <Line
                    connectNulls
                    type="monotone"
                    dataKey="Temperatures_min"
                    stroke="#007fff"
                    dot={true}
                  />
                </>
              )}
            </LineChart>
          </StyledDiv>
        </StyledNav>
      </StyledSection>
    </>
  );
}
