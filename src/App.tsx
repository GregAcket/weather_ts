import { useState } from "react";
import { City, Coordinates } from "./models/types";
import { styled } from "styled-components";
import { Basic } from "unsplash-js/dist/methods/photos/types";

import Pictures from "./components/Pictures";
import Weather from "./components/Weather";
import ResearchBar from "./components/ResearchBar";

const StyledUl = styled.ul`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

const StyledWeatherSection = styled.section`
  display: flex;
`;

export default function App() {
  const [city, setCity] = useState<string>("");
  const [foundCity, setFoundCity] = useState<City[]>([]);
  const [picture, setPicture] = useState<Basic[]>([]);
  const [coord, setCoord] = useState<Coordinates>({
    ville: "",
    latitude: 0,
    longitude: 0,
    checkWeather: false,
  });

  return (
    <>
      <main>
        <ResearchBar
          city={city}
          setCity={setCity}
          foundCity={foundCity}
          setFoundCity={setFoundCity}
          setPicture={setPicture}
          setCoord={setCoord}
        />
        <StyledWeatherSection>
          {coord.checkWeather && <Weather coord={coord} />}
        </StyledWeatherSection>
        <StyledUl>
          <Pictures image={picture} />
        </StyledUl>
      </main>
    </>
  );
}
