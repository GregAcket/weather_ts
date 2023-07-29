import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
import { createGlobalStyle } from "styled-components";
import { StyledProps } from "../../models/types";

const StyledGlobalStyle = createGlobalStyle<StyledProps>`

* {
  box-sizing: border-box;
}

body {
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? "black" : "white")};
  color: ${({ $isDarkMode }) => ($isDarkMode ? "white" : "black")};
  margin: 0;
}

#root {
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 1440px;
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
`;

export default function GlobalStyle() {
  const { theme } = useContext(ThemeContext);

  return <StyledGlobalStyle $isDarkMode={theme === "dark"} />;
}
