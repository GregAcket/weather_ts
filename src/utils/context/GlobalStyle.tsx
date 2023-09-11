import { createGlobalStyle } from "styled-components"
import { StyledProps } from "../types"

const StyledGlobalStyle = createGlobalStyle<StyledProps>`

* {
  box-sizing: border-box;
}

body {
  min-width:100vw;
  min-height:100vh;
  margin: 0;
  background: radial-gradient(circle at top right, gold , #1e81b0 20%, #0b5186);
}

#root {
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 1440px;
  font-size: 16px;
  font-family: sans-serif;

  @media (min-width: 768px){
    font-size:18px;
  }
}

h1,
h2,
p,
ul {
  margin: 0px;
}

button,
ul {
  padding: 0px;
}
`

export default function GlobalStyle() {
  return <StyledGlobalStyle />
}
