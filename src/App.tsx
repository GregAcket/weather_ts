import { FormEvent, MouseEvent, useState } from "react";
import { createApi } from "unsplash-js";
import { City, Coordinates } from "./models/types";
import { styled } from "styled-components";
import { Basic } from "unsplash-js/dist/methods/photos/types";

import Pictures from "./components/Pictures";
import Weather from "./components/Weather";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const StyledDivContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 90px;
  background: transparent;
  margin-top: 20px;
`;

const Styledbutton = styled.button`
  min-width: 500px;
  margin-bottom: 5px;
  border: 1px solid black;
  border-radius: 5px;
  background: rgb(233, 233, 233, 0.6);
  &:hover {
    background: rgb(233, 233, 233, 1);
  }
`;

const StyledUl = styled.ul`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
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

  const api = createApi({
    accessKey: import.meta.env.VITE_UNSPLASH_KEY,
  });

  function isoToEmoji(code: string): string {
    return code
      .split("")
      .map((letter) => (letter.charCodeAt(0) % 32) + 0x1f1e5)
      .map((emojiCode) => String.fromCodePoint(emojiCode))
      .join("");
  }

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setCity(e.currentTarget.value);

    fetch(
      "https://geocoding-api.open-meteo.com/v1/search?name=" +
        city +
        "&count=5&language=fr&format=json"
    )
      .then((resolve) => {
        if (resolve.ok) {
          return resolve.json();
        }
      })

      .then((data) => {
        setFoundCity(data.results);
      })

      .catch((err) => {
        alert(`Une  erreur s'est produite. Veuillez nous excuser`);

        console.log(err);
      });
  };

  const handleSubmit = (
    e: MouseEvent,
    name: string,
    lat: number,
    long: number
  ) => {
    e.preventDefault();

    api.search
      .getPhotos({
        query: name,
        orientation: "landscape",
        perPage: 3,
      })

      .then((image) => {
        if (image.response !== undefined) {
          setPicture(image.response.results);
        }
        setCoord({
          ville: name,
          latitude: lat,
          longitude: long,
          checkWeather: true,
        });
        setFoundCity([]);
      })

      .catch(() => {
        console.log("Oups, something went wrong!");
      });
  };

  const results = foundCity?.map((cities) => {
    return (
      <>
        <Styledbutton
          key={cities.id}
          onClick={(e) =>
            handleSubmit(e, cities.name, cities.latitude, cities.longitude)
          }
        >
          <div>
            {isoToEmoji(cities.country_code)}
            {cities.name}
          </div>
          {cities.admin1} ( lat: {cities.latitude} long: {cities.longitude} )
        </Styledbutton>
      </>
    );
  });

  return (
    <>
      <main>
        <StyledForm>
          <label htmlFor="city">Quel temps fait il à ...</label>
          <input
            type="search"
            name="city"
            id="city"
            placeholder="Paris"
            value={city}
            onChange={(e) => handleInputChange(e)}
          />
          <StyledDivContainer>{results}</StyledDivContainer>
        </StyledForm>
        <StyledUl>
          <Pictures image={picture} />
        </StyledUl>
        {coord.checkWeather && <Weather coord={coord} />}
      </main>
    </>
  );
}
