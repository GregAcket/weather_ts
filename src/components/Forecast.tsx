import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  TooltipProps,
} from "recharts"
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent"
import { styled } from "styled-components"
import {
  ForecastWeather,
  ForecastWind,
  StyledProps,
  Data,
} from "../utils/types"
import { useState } from "react"

type ForecastProps = {
  datasForcastForToday: Data[]
  formatedDatesForToday: string[]
  getDatesForToday: Date[]
  twentyFourHourData: Data[]
  todaysDatas: Data[]
  forecast: ForecastWeather[]
  forecastWind: ForecastWind[]
}

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid;
  max-width: 750px;
  width: 100%;
  @media (min-width: 768px) {
    max-width: calc(100% - 300px);
    padding-left: 20px;
    border-top: none;
    border-left: 1px solid;
  }
`
const StyledNav = styled.nav`
  width: 100%;
  margin-top: 10px;
`

const StyledNavUl = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`

const StyledNavLi = styled.li<StyledProps>`
  display: flex;
  justify-content: center;
  padding: 2px 0px;
  width: 45%;
  border-radius: 5px;
  border: ${({ $isActive }) => ($isActive ? "1px solid" : "")};
  list-style: none;
  cursor: pointer;
  &:hover {
    transition: all 500ms;
    background: white;
  }
`

const StyledArticle = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border: 1px solid;
  border-radius: 5px;
  padding: 20px 10px;
  max-width: 1069px;
  width: 100%;
`

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 3px double;
  margin-bottom: 20px;
  padding-bottom: 20px;
  width: 100%;
  min-height: 300px;
`

const StyledLi = styled.li`
  display: grid;
  grid-template-columns: 92px 1fr 80px;
  align-items: center;
  list-style: none;

  @media (min-width: 768px) {
    grid-template-columns: 110px 1fr 90px;
  }
`

const StyledDivLi = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`
const DivWind = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`

const DivTemp = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledDivCharts = styled.div`
  display: flex;
  height: 200px;
  min-width: 300px;
  width: 100%;
  @media (min-width: 768px) {
    height: 250px;
  }
`

const weathercodeToJsx = (
  arr1: Data[],
  arr2: (ForecastWeather | ForecastWind)[]
) => {
  const weatherWithJsx = arr1.map((code: Data) => {
    const match = arr2.find(
      (logo: ForecastWeather | ForecastWind) => code.weathercode === logo.value
    )
    if (match) {
      const merge = {
        ...code,
        weathercode: match.emote,
      }
      return merge
    }
  })
  return weatherWithJsx
}

const windDirection = (datas: Data[], arr1: ForecastWind[]) => {
  const mapped = datas.map((data) => {
    const filtered = arr1.find(
      (direction) =>
        data.winddirection !== undefined &&
        direction.min < data.winddirection &&
        direction.max > data.winddirection
    )
    if (filtered === undefined) {
      const merge = {
        ...data,
        winddirection: arr1[0].emote,
        value: arr1[0].value,
      }
      return merge
    } else {
      const change = {
        ...data,
        winddirection: filtered.emote,
        value: filtered.value,
      }
      return change
    }
  })
  return mapped
}

export default function Forecast({
  datasForcastForToday,
  formatedDatesForToday,
  getDatesForToday,
  twentyFourHourData,
  todaysDatas,
  forecast,
  forecastWind,
}: ForecastProps) {
  const [isActive, setIsActive] = useState("today")

  function handleChangeActiveTab() {
    isActive === "today" ? setIsActive("nextweek") : setIsActive("today")
  }

  ////////// Forecast for next week //////////

  function ForecastForNextWeek() {
    const days = getDatesForToday.map((day) => {
      return day.getDay()
    })

    const week = [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ]

    const emoteWeek = weathercodeToJsx(todaysDatas, forecast)
    const emoteWindWeek = windDirection(todaysDatas, forecastWind)

    const weekly = []

    for (let i = 0; i < week.length; i++) {
      const semaine = (
        <StyledLi key={i}>
          {week[days[i]]} :
          <StyledDivLi>
            {emoteWeek[i]?.weathercode}
            <DivWind>
              {emoteWindWeek[i]?.winddirection}
              {emoteWindWeek[i]?.value}
            </DivWind>
          </StyledDivLi>
          <DivTemp>
            <p>Max: {todaysDatas[i].TºC_max}</p>
            <p>Min: {todaysDatas[i].TºC_min}</p>{" "}
          </DivTemp>
        </StyledLi>
      )
      weekly.push(semaine)
    }
    return <>{weekly}</>
  }

  ////////// Forecast for Today //////////

  function ForecastForToday() {
    const fourHours = twentyFourHourData.filter((four) => {
      if (four.heure !== undefined && four.heure % 4 === 0) {
        const hour = four.heure
        return hour
      }
    })

    const emoteHour = weathercodeToJsx(fourHours, forecast)
    const emoteWindHour = windDirection(fourHours, forecastWind)

    const horaire = []

    for (let i = 0; i < emoteHour.length; i++) {
      const heure = (
        <StyledLi key={i}>
          {emoteHour[i]?.heure}h00 :
          <StyledDivLi>
            {emoteHour[i]?.weathercode}
            <DivWind>
              {emoteWindHour[i]?.winddirection} {emoteWindHour[i]?.value}{" "}
            </DivWind>
          </StyledDivLi>
          {fourHours[i].TºC}ºC
        </StyledLi>
      )
      horaire.push(heure)
    }
    return <>{horaire}</>
  }

  function CustomTooltip({
    active,
    payload,
  }: TooltipProps<ValueType, NameType>) {
    if (active && payload !== undefined) {
      return (
        <>
          {payload === null ? undefined : (
            <div>
              {isActive === "nextweek" && <p>{payload[0].payload.date}</p>}
              <p>{payload[0].payload.heure}h00</p>
              <p>{payload[0].value}ºC</p>
            </div>
          )}
        </>
      )
    }
  }

  return (
    <>
      <StyledSection>
        <p>Vos prévisions pour :</p>

        <StyledNav>
          <StyledNavUl>
            <StyledNavLi
              $isActive={isActive === "today"}
              onClick={handleChangeActiveTab}
            >
              Aujourd'hui
            </StyledNavLi>
            <StyledNavLi
              $isActive={isActive === "nextweek"}
              onClick={handleChangeActiveTab}
            >
              Cette semaine
            </StyledNavLi>
          </StyledNavUl>
        </StyledNav>

        <StyledArticle>
          <StyledUl>
            {isActive === "today" ? (
              <ForecastForToday />
            ) : (
              <ForecastForNextWeek />
            )}
          </StyledUl>

          <StyledDivCharts>
            <ResponsiveContainer>
              <LineChart
                data={
                  isActive === "today"
                    ? twentyFourHourData
                    : datasForcastForToday
                }
                margin={{ left: -25, right: 20 }}
              >
                {isActive === "today" ? (
                  <XAxis dataKey="heure" stroke="#000" />
                ) : (
                  <XAxis
                    stroke="#000"
                    dataKey="date"
                    ticks={formatedDatesForToday}
                    padding={{ left: 15 }}
                  />
                )}

                <YAxis stroke="#000" />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="top"
                  align="right"
                  wrapperStyle={{ left: 10 }}
                />
                <Line type="monotone" dataKey="TºC" stroke="#ff0" dot={false} />

                {isActive === "nextweek" && (
                  <>
                    <Line
                      connectNulls
                      type="monotone"
                      dataKey="TºC_max"
                      stroke="#f00"
                      dot={true}
                    />
                    <Line
                      connectNulls
                      type="monotone"
                      dataKey="TºC_min"
                      stroke="#0f0"
                      dot={true}
                    />
                  </>
                )}
              </LineChart>
            </ResponsiveContainer>
          </StyledDivCharts>
        </StyledArticle>
      </StyledSection>
    </>
  )
}
