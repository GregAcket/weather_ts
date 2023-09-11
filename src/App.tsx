import { useState } from "react"
import { City, Coordinates } from "./utils/types"
import { styled } from "styled-components"
import Weather from "./components/Weather"
import ResearchBar from "./components/ResearchBar"

const StyledWeatherSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 25px;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`

export default function App() {
  const [city, setCity] = useState<string>("")
  const [foundCity, setFoundCity] = useState<City[]>([])
  const [coord, setCoord] = useState<Coordinates>({
    ville: "",
    latitude: 0,
    longitude: 0,
    checkWeather: false,
  })

  return (
    <>
      <main onClick={() => setFoundCity([])}>
        <ResearchBar
          city={city}
          setCity={setCity}
          foundCity={foundCity}
          setFoundCity={setFoundCity}
          setCoord={setCoord}
        />
        <StyledWeatherSection>
          {coord.checkWeather && <Weather coord={coord} />}
        </StyledWeatherSection>
      </main>
    </>
  )
}
