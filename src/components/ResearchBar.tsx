import { ChangeEvent, MouseEvent, useState } from "react";
import { styled } from "styled-components";
import { ResearchBarProps } from "../models/types";
import { createApi } from "unsplash-js";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const StyledInput = styled.input`
  margin-top: 5px;
  border-radius: 3px;
  border: 1px solid black;
`;

const StyledDivContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 90px;
  background: transparent;
  margin-top: 25px;
  max-width: 350px;
  z-index: 1;
  @media (min-width: 768px) {
    max-width: 500px;
  }
`;

const Styledbutton = styled.button`
  margin-bottom: 5px;
  padding: 0px 3px;
  border: 1px solid black;
  border-radius: 5px;
  background: rgb(233, 233, 233, 0.6);
  &:hover {
    background: rgb(233, 233, 233, 1);
  }
`;

export default function ResearchBar({
  city,
  setCity,
  foundCity,
  setFoundCity,
  setPicture,
  setCoord,
}: ResearchBarProps) {
  const [name, setName] = useState("...");

  function isoToEmoji(code: string): string {
    return code
      .split("")
      .map((letter) => (letter.charCodeAt(0) % 32) + 0x1f1e5)
      .map((emojiCode) => String.fromCodePoint(emojiCode))
      .join("");
  }

  const api = createApi({
    accessKey: import.meta.env.VITE_UNSPLASH_KEY,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        setCity("");
        setName(name);
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
      <StyledForm>
        <label htmlFor="city">Quel temps fait il à {name}</label>
        <StyledInput
          type="search"
          name="city"
          id="city"
          value={city}
          onChange={(e) => handleInputChange(e)}
        />
        <StyledDivContainer>{results}</StyledDivContainer>
      </StyledForm>
    </>
  );
}
