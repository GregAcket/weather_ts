import { ChangeEvent, MouseEvent, useState } from "react"
import { styled } from "styled-components"
import { City, ResearchBarProps } from "../utils/types"
import location from "../assets/location.svg"

type Datas = {
  results: City[]
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin: 50px 0px 20px;
`

const StyledInput = styled.input`
  border-radius: 3px;
  border: 1px solid black;
  height: 30px;
  width: 250px;
  background: transparent;
  font-size: 18px;
`

const StyledDivContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 100px;
  background: transparent;
  margin-top: 25px;
  max-width: 350px;
  z-index: 1;
  @media (min-width: 768px) {
    max-width: 500px;
  }
`

const Styledbutton = styled.button`
  font-size: 18px;
  margin-bottom: 5px;
  padding: 0px 3px;
  border: 1px solid black;
  border-radius: 5px;
  background: rgb(233, 233, 233, 0.7);
  &:hover {
    background: rgb(233, 233, 233, 1);
  }
  &:focus {
    background: rgb(233, 233, 233, 1);
  }
`

const Div = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`

const Img = styled.img`
  cursor: pointer;
`

// const LocateButton = styled.button`
//   background: transparent;
//   border: none;
//   cursor: pointer;
// `

export default function ResearchBar({
  city,
  setCity,
  foundCity,
  setFoundCity,
  setCoord,
}: ResearchBarProps) {
  //STATE

  const [name, setName] = useState(" à ...")

  function isoToEmoji(code: string) {
    if (code !== undefined) {
      return code
        .split("")
        .map((letter) => (letter.charCodeAt(0) % 32) + 0x1f1e5)
        .map((emojiCode) => String.fromCodePoint(emojiCode))
        .join("")
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.currentTarget.value)

    const url =
      "https://geocoding-api.open-meteo.com/v1/search?name=" +
      city +
      "&count=10&language=fr&format=json"

    const fetchData = async () => {
      try {
        const response = await fetch(url)
        const data = (await response.json()) as Datas
        console.log(data.results)
        setFoundCity(data.results)
      } catch (error) {
        console.log(error)
        alert(`Une  erreur s'est produite. Veuillez nous excuser`)
      }
    }

    void fetchData()
  }

  const handleSubmit = (
    e: MouseEvent,
    name: string,
    lat: number,
    long: number
  ) => {
    e.preventDefault()
    setCoord({
      ville: name,
      latitude: lat,
      longitude: long,
      checkWeather: true,
    })
    setFoundCity([])
    setCity("")
    setName("à" + " " + name)
  }

  const locate = (e: MouseEvent) => {
    e.preventDefault()

    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude

      setCoord({
        latitude: latitude,
        longitude: longitude,
        checkWeather: true,
      })

      setName(" près de vous ")
    })
  }
  const results = foundCity?.map((cities) => {
    return (
      <Styledbutton
        key={cities.id}
        onClick={(e) =>
          handleSubmit(e, cities.name, cities.latitude, cities.longitude)
        }
      >
        <div>
          {isoToEmoji(cities.country_code)} {cities.name}
        </div>
        {cities.admin1} ( lat: {cities.latitude} , long: {cities.longitude} )
      </Styledbutton>
    )
  })

  return (
    <>
      <StyledForm>
        <label htmlFor="city">Quel temps fait il {name}</label>
        <Div>
          <Img src={location} alt="location icon" onClick={(e) => locate(e)} />
          <StyledInput
            type="search"
            name="city"
            id="city"
            value={city}
            onChange={(e) => handleInputChange(e)}
          />
        </Div>
        <StyledDivContainer>{results}</StyledDivContainer>
      </StyledForm>
    </>
  )
}
